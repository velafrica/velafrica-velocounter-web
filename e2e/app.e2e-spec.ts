import { VelafricaCounterWebPage } from './app.po';

describe('velafrica-counter-web App', () => {
  let page: VelafricaCounterWebPage;

  beforeEach(() => {
    page = new VelafricaCounterWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
