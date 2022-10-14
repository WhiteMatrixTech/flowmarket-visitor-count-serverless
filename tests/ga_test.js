const googleAnalytics = require('@google-analytics/data')

const page = "/collection/mainnet_flow-A.635a9971e6bdc54a.Hexi_Coll_1152/0";
const analyticsDataClient = new googleAnalytics.BetaAnalyticsDataClient({
  projectId: "market-visit-count", credentials: {
    client_email: "account1@market-visit-count.iam.gserviceaccount.com", private_key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxSbgrBVBJyCJK
t3llOx7heGPhQGCvyCyXPoCn4vlRDrlcGjQamHBC0mNzkVCTnvdIUTP8ddgB5TjB
M0ndA4+WFMUUzkTeGhzxrM2U81xjUwR9PA7vZxY1MK6i0WPdvJhH32MpcuQIbG/m
yDKyAVsCRnwLyBMmyPsNB9Xm8+uhtq6+cJaqtUYH0KxpIpCFMc7D8fc15k1AoVxU
USnlZU7zcUl3W3qnYmeLzVE+RCs1kPHHJrEdjDJBf6Jgy6fa2qTkC56QYn3KRnJO
vGcid/liHxkkXkf7y4I5FPnJHMKxnMW0iSNgCAPEsDrbMBjisrxgDzUereSnt1D3
hit45P/vAgMBAAECggEAC068ZGIOYOZW6ZUSNRa0PYVEOZW1lQCbd3oREqQzaqwZ
vnodYKTgZCKvHSvji8bT1tT3D98kS9qm6AuxZltXySbB+zW8xr27ot52rk1nUx50
Zthxy2szy2izescIK5hfzhW9aWNej/r6mCmksh3MBDUirE2yiwK+oHIjfnuIR+QX
tVm3ogdgvu6wOvIZpes0PHfVn7EFtBc/BSOoDRReiyELUOsErmNOy/j3PnanWtjw
Nb6XcfOoPiySHS3WMjun+90lcqAF6U816ZflFZ+VLfp092fXCdnj8FreEsGN3Q9L
UVSMqbjg/78kYhQpQqcUy4mddnSRi8ifDo1dL65AQQKBgQDm+OgAH6G771nPYnPb
bIjBcNZTOKo2vSvHWX7spsKWmA4gMY38KPUmukCih/TvWArNkAWtGaRWCsSixlyK
MrCF5BXNBpXpWsKXoQQPhtTX2TeZFSNR1qCq1Gu5g720O5zUMWq1bpRlwwZdsHhK
mv+pm5ZyIyHQ3bjJRmZDpSXxeQKBgQDEf6DHzIunGzGWIMCN5iSiC5IUtQy43U6v
aeBf/Hdh6UD1tR+1SEmou4QoAqA1piQ1ccBsGMidJI1qTj/frHXti0hLjOTMstCU
Uju6+arMbrbQiuTTQUhftRYd3/lafQh+lIUyhRPo7k1BSY04bWenjXMQ4XSPPEPt
5cTKXbPKpwKBgQDbWkf61g+jjAyfB8FAAjNegusI3ifJFJ8fE7+WwEjM/Ftt96IA
eGVaAkigEr5rEBIyZzT8z/1iOZfFft0j4kAC6DpMHJUCqU9k8WYJ2OMKmyBSIeEJ
N+weUN59sL/ZC0RFwSi2Ze5JNo41LAMR12I2kayveO4Ejo2PmWxFkfIXAQKBgEhM
MSryLnvofIEhQdez0sywdyoZRzoJazcNPJn0eTRULyt4XddEZp2niMNz2+CBZZco
aEUdhUqUNVfkvImembEx6wKpL1HFhQrdis6Lp/UZ0ze9st2rimZ0aVPKoaNSl7qD
CNMCtcWhUFlyJ3yYfGfgmnKekVVWNiQkwxg2C73HAoGBAN5W63XX5NwX2+zt5eOT
HqAwETILD9u6uAIYGAcegS+nYM6NcYv6D8G6dwu4f6I00Gh2EpbRrG97bapQL30b
uUSkb7iPqTq2ZaMHeYNgXRuBojLeoXM0kbmfsSmNaZNq8oNUlYQNTzc7d7vB5LOA
BlfYbWW3MqaRpQ7m3koK+bjIqaz
-----END PRIVATE KEY-----
` }, scopes: 'https://www.googleapis.com/auth/analytics.readonly'
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

