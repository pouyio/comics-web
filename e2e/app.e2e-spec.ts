import { ComicWebPage } from './app.po';

describe('comic-web App', () => {
  let page: ComicWebPage;

  beforeEach(() => {
    page = new ComicWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
