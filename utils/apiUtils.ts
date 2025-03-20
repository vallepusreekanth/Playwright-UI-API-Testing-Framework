import { APIRequestContext, APIResponse } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export async function makeRequest(request: APIRequestContext, method: string, endpoint: string, requestBody?: any): Promise<APIResponse> {
    const options: any = {};
    if (requestBody) {
        options.data = requestBody;
    }
    switch (method.toLowerCase()) {
        case 'get':
            return await request.get(endpoint, options);
        case 'post':
            return await request.post(endpoint, options);
        case 'put':
            return await request.put(endpoint, options);
        case 'delete':
            return await request.delete(endpoint, options);
        case 'patch':
            return await request.patch(endpoint, options);
        default:
            throw new Error(`Unsupported method: ${method}`);
    }
}

export async function get(request: APIRequestContext, endpoint: string): Promise<APIResponse> {
    return await makeRequest(request, 'get', endpoint);
}

export async function post(request: APIRequestContext, endpoint: string, requestBody: any): Promise<APIResponse> {
    return await makeRequest(request, 'post', endpoint, requestBody);
}

export async function put(request: APIRequestContext, endpoint: string, requestBody: any): Promise<APIResponse> {
    return await makeRequest(request, 'put', endpoint, requestBody);
}

export async function deleteRequest(request: APIRequestContext, endpoint: string): Promise<APIResponse> {
    return await makeRequest(request, 'delete', endpoint);
}

export async function patch(request: APIRequestContext, endpoint: string, requestBody: any): Promise<APIResponse> {
    return await makeRequest(request, 'patch', endpoint, requestBody);
}

export async function verifyResponseStatusCode(response: APIResponse, expectedStatusCode: number): Promise<boolean> {
    return response.status() === expectedStatusCode;
}

export async function verifyResponseBodyKeyPresent(responseBody: any, expectedKeyName: string): Promise<boolean> {
    return expectedKeyName in responseBody;
}

export async function verifyResponseBodyKeyValue(responseBody: any, expectedKeyName: string, expectedValue: any): Promise<boolean> {
    return responseBody[expectedKeyName] === expectedValue;
}

export async function verifyResponseWithJsonFile(responseBody: any, jsonFileName: string): Promise<boolean> {
    const filePath = path.join(__dirname, '../test-data/api', `${jsonFileName}.json`);
    const expectedData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return JSON.stringify(responseBody) === JSON.stringify(expectedData);
}

/**
 * Updates the values in a JSON object based on the provided updates.
 * 
 * @param jsonData - The original JSON data.
 * @param updates - An object containing the keys and values to update.
 * @returns The updated JSON data.
 * 
 * @example
 * const originalData = {
 *   title: 'Original Post',
 *   body: 'Original content',
 *   tags: ['tag1', 'tag2'],
 *   author: {
 *     name: 'Author Name',
 *     email: 'author@example.com',
 *   },
 * };
 * 
 * const updates = {
 *   'author.name': 'Updated Author',
 * };
 * 
 * const updatedData = updateJsonValues(originalData, updates);
 */
export const updateJsonValues = (jsonData: any, updates: { [key: string]: any }) => {
    for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
            const keys = key.split('.');
            let current = jsonData;
            keys.forEach((k, index) => {
                if (index === keys.length - 1) {
                    current[k] = updates[key];
                } else {
                    current = current[k];
                }
            });
        }
    }
    return jsonData;
};

export const apiUtils = {
    verifyResponseStatusCode,
    verifyResponseBodyKeyPresent,
    verifyResponseBodyKeyValue,
    verifyResponseWithJsonFile,
    updateJsonValues
};