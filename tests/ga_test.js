const googleAnalytics = require('@google-analytics/data')

const page = "/collection/mainnet_flow-A.635a9971e6bdc54a.Hexi_Coll_1152/0";
//For test: remove special string
// The service account key must never be committed. Provide it through the
// environment, the same way functions/config.ts does:
//   PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..." node tests/ga_test.js
if (!process.env.PRIVATE_KEY) {
  console.error('PRIVATE_KEY is not set, see functions/config.ts');
  process.exit(1);
}

const analyticsDataClient = new googleAnalytics.BetaAnalyticsDataClient({
  projectId: "market-visit-count",
  credentials: {
    client_email: "account1@market-visit-count.iam.gserviceaccount.com",
    private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
  },
  scopes: 'https://www.googleapis.com/auth/analytics.readonly'
});

// Runs a simple report.
async function Test() {
  const [data] = await analyticsDataClient.runReport({
    property: `properties/335033272`,
    dateRanges: [
      {
        startDate:'2010-01-01',
        endDate: 'today',
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
          value: page,
        }
      },
    },
  });

  let resData = {}
  if (data.rowCount && data.rows?.length && data.rows[0].dimensionValues?.length && data.rows[0].metricValues?.length) {
    resData = { key: data.rows[0].dimensionValues[0].value, value: data.rows[0].metricValues[0].value }
  } else {
    resData = { key: page, value: "0" }
  }

  console.log(resData, JSON.stringify(data))
}

Test()

