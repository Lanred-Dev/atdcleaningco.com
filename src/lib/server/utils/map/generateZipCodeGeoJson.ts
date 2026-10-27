import { type CompanyInfo } from "#lib/server/db/schema.ts";
import fs from "fs";
import path from "path";

const ZIP_CODES_GEO_JSON = JSON.parse(
    fs.readFileSync(path.resolve("data/ALZipCodes.json"), "utf8")
);

type ZipCodeFeature = {
    properties: {
        ZCTA5CE10?: string;
        GEOID10?: string;
    };
    geometry: {
        type: "Polygon" | "MultiPolygon";
        coordinates: number[][][] | number[][][][];
    };
};

/**
 * Generates a GeoJSON object for the given service areas (zip codes).
 *
 * @param serviceAreas - A set of zip codes representing the service areas.
 * @returns A GeoJSON object containing the features for the specified zip codes.
 * @throws Will throw an error if any of the provided zip codes are invalid or not found in the GeoJSON data.
 */
export default function generateZipCodeGeoJson(
    serviceAreas: Set<string>
): CompanyInfo["serviceAreasGeoJson"] {
    const filtered = ZIP_CODES_GEO_JSON.features.filter((feature: ZipCodeFeature) => {
        const zipCode = feature.properties.ZCTA5CE10 || feature.properties.GEOID10;
        if (!zipCode) return false;
        return serviceAreas.has(zipCode);
    });

    if (filtered.length === 0 || filtered.length !== serviceAreas.size)
        throw new Error("Invalid service areas");

    let minLongitude = Infinity;
    let maxLongitude = -Infinity;
    let minLatitude = Infinity;
    let maxLatitude = -Infinity;

    filtered.forEach((feature: ZipCodeFeature) => {
        const coords: number[][] =
            feature.geometry.type === "MultiPolygon"
                ? (feature.geometry.coordinates as number[][][][]).flat(2)
                : (feature.geometry.coordinates as number[][][]).flat(1);

        coords.forEach(([longitude, latitude]) => {
            if (longitude < minLongitude) minLongitude = longitude;
            if (latitude < minLatitude) minLatitude = latitude;
            if (longitude > maxLongitude) maxLongitude = longitude;
            if (latitude > maxLatitude) maxLatitude = latitude;
        });
    });

    return {
        type: "FeatureCollection",
        bounds: [minLongitude, minLatitude, maxLongitude, maxLatitude],
        features: filtered,
    };
}
