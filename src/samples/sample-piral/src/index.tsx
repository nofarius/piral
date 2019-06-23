import * as React from 'react';
import { renderInstance } from 'piral';
import { MenuToggle, User } from './components';
import { setupFooter, setupMenu } from './parts';

renderInstance({
  subscriptionUrl: false,
  attach(api) {
    setupFooter(api);
    setupMenu(api);
  },
  Loader: () => (
    <div className="pi-center">
      <div className="pi-spinner">Loading</div>
    </div>
  ),
  FeedErrorInfo: ({ error }) => (
    <div className="pi-error">
      <img src={require('./images/error.svg')} alt="Error"/>
      <div className="pi-title">Data Unavailable</div>
      <div className="pi-description">
        The demanded data has not been found. Please contact support to resolve this issue.
      </div>
      <div className="pi-details">{error}</div>
    </div>
  ),
  FormErrorInfo: () => (
    <div className="pi-error">
      <img src={require('./images/error.svg')} alt="Error"/>
      <div className="pi-title">Submission Failed</div>
      <div className="pi-description">The form could not be submitted.</div>
    </div>
  ),
  LoadingErrorInfo: () => (
    <div className="pi-error">
      <img src={require('./images/error.svg')} alt="Error"/>
      <div className="pi-title">Something Went Wrong</div>
      <div className="pi-description">
        An error occured during the loading process. Try refreshing or come back later.
      </div>
    </div>
  ),
  NotFoundErrorInfo: () => (
    <div className="pi-error">
      <img src={require('./images/not-found.svg')} alt="Not Found"/>
      <div className="pi-title">Page Not Found</div>
      <div className="pi-description">
        The provided URL does not map to a page. Please contact support to resolve this issue.
      </div>
    </div>
  ),
  PageErrorInfo: () => (
    <div className="pi-error">
      <img src={require('./images/error.svg')} alt="Error"/>
      <div className="pi-title">Page Crashed</div>
      <div className="pi-description">
        Sorry for the inconvenience. We try to resolve the issue as soon as possible.
      </div>
    </div>
  ),
  UnknownErrorInfo: () => (
    <div className="pi-error">
      <img src={require('./images/error.svg')} alt="Error"/>
      <div className="pi-title">Unknown Error</div>
      <div className="pi-description">An unknown error occured.</div>
    </div>
  ),
  DashboardContainer: ({ children }) => <div className="pi-dashboard">{children}</div>,
  Tile: ({ children }) => <div className="pi-tile">{children}</div>,
  MenuContainer: ({ children }) => <div className="pi-menu">{children}</div>,
  MenuItem: ({ children }) => <div className="pi-item">{children}</div>,
  SearchContainer: ({ input, loading, children }) => (
    <div className="pi-search">
      {input}
      <div className="pi-details">
        {children}
        {loading && (
          <div className="pi-center">
            <div className="pi-spinner" />
          </div>
        )}
      </div>
    </div>
  ),
  SearchInput: ({ setValue, value }) => (
    <input type="search" required placeholder="Search ..." onChange={e => setValue(e.target.value)} value={value} />
  ),
  SearchResult: ({ children }) => <div className="pi-item">{children}</div>,
  NotificationsContainer: ({ children }) => <div className="pi-notifications">{children}</div>,
  NotificationItem: ({ options, close, content }) => (
    <div className={`pi-item ${options.type}`}>
      <div className="pi-details">
        {options.title && <div className="pi-title">{options.title}</div>}
        <div className="pi-description">{content}</div>
      </div>
      <div className="pi-close" onClick={close} />
    </div>
  ),
  ModalsContainer: ({ children }) => <div className="pi-modal">{children}</div>,
  ModalDialog: ({ children }) => <div className="pi-modal">{children}</div>,
  Layout: ({ Menu, Notifications, Search, children, Modals }) => (
    <div className="app-container">
      <div className="app-menu">
        <div className="app-menu-content">
          <Menu type="general" />
          <Menu type="admin" />
        </div>
      </div>
      <Notifications />
      <Modals />
      <div className="app-header">
        <div className="app-title">
          <MenuToggle />
          <h1>Piral Sample</h1>
        </div>
        <Search />
        <Menu type="header" />
        <User />
      </div>
      <div className="app-content">{children}</div>
      <div className="app-footer">
        <Menu type="footer" />
      </div>
    </div>
  ),
  requestPilets: () =>
    fetch('https://sample.piral.io/api/v1/pilet')
      .then(res => res.json())
      .then(res => res.items),
});

export * from 'piral';