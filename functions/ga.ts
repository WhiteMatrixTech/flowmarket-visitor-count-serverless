import { BetaAnalyticsDataClient } from '@google-analytics/data'
import config from './config'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

/**
 * hit count. Served by Google Analytics
 */
exports.handler = async (event) => {
  const page = decodeURIComponent(event.queryStringParameters.page || "");
  const analyticsDataClient = new BetaAnalyticsDataClient({ projectId: config.auth.projectId, credentials: { client_email: config.auth.clientEmail, private_key: config.auth.privateKey }, scopes: 'https://www.googleapis.com/auth/analytics.readonly' });

  // Runs a simple report.
  const [data] = await analyticsDataClient.runReport({
    property: `properties/${config.propertyId}`,
    dateRanges: [
      {
        startDate: config.startDate,
        endDate: config.endDate,
      },
    ],
    metrics: [
      {
        name: 'screenPageViews',
      },
    ],
    dimensions: [
      {
        name: 'pagePath',
      },
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: {
          matchType: "EXACT",
          value: page as string,
        }
      },
    },
  });

  let resData: Object = {}
  if (data.rowCount && data.rows?.length && data.rows[0].dimensionValues?.length && data.rows[0].metricValues?.length) {
    resData = { key: data.rows[0].dimensionValues[0].value, value: data.rows[0].metricValues[0].value, originData: JSON.stringify(data) }
  } else {
    resData = { key: page, value: "0", originData: JSON.stringify(data) }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(resData),
    headers
  };
};