import { test, expect } from '@playwright/test';
import { API_ENDPOINTS } from '../../config/apiEndPoints';
import { get, post, apiUtils } from '../../utils/apiUtils';
import userCredentials from '../../test-data/api/jsons/userCredentials.json';

test.describe('API Testing', () => {

  test('GET request', async ({ request }) => {
    const response = await get(request, API_ENDPOINTS.getAllProductsList);
    expect(apiUtils.verifyResponseStatusCode(response, 200)).toBeTruthy();
  });

  test('POST request', async ({ request }) => {
  
    const response = await post(request, API_ENDPOINTS.verifyLoginWithValidCredentials, userCredentials);
    expect(apiUtils.verifyResponseStatusCode(response, 200)).toBeTruthy();
    
  });

});