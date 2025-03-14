import nock from 'nock';

export const createMockApi = <T>(response?: T) => {
  if (!response) {
    return nock('https://api.polygon.io')
      .get('/v3/reference/tickers')
      .query(true);
  }
  return (
    nock('https://api.polygon.io')
      .get('/v3/reference/tickers')
      .query(true)
      // @ts-ignore
      .reply(200, response)
  );
};
