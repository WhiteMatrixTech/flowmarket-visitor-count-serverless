import { NowRequest, NowResponse } from '@vercel/node'
import { BetaAnalyticsDataClient } from '@google-analytics/data'
import config from './config'

/**
 * hit count. Served by Google Analytics
 */
export default async (req: NowRequest, resp: NowResponse) => {
  // API query page parameter
  const { page = '' } = req.query
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
    resData = { key: data.rows[0].dimensionValues[0].value, value: data.rows[0].metricValues[0].value }
  } else {
    resData = { key: page, value: "0" }
  }

  resp.setHeader('Access-Control-Allow-Origin', '*')
  resp.status(200).send(resData)
}
