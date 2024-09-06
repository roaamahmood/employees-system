import { EmployeesSystemTemplatePage } from './app.po';

describe('EmployeesSystem App', function() {
  let page: EmployeesSystemTemplatePage;

  beforeEach(() => {
    page = new EmployeesSystemTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
