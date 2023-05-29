import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";

import Error404Classic from "./pages/error/404-classic";
import Error404Modern from "./pages/error/404-modern";
import Error504Modern from "./pages/error/504-modern";
import Error504Classic from "./pages/error/504-classic";

import Faq from "./pages/others/Faq";
import Terms from "./pages/others/Terms";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Success from "./pages/auth/Success";
import InvoicePrint from "./pages/pre-built/invoice/InvoicePrint";
import AnalyticsHomePage from "./pages/Analytics";
import InvestHomePage from "./pages/Invest";
import BlankPage from "./pages/others/Blank";
import ProjectCardPage from "./pages/pre-built/projects/ProjectCard";
import ProjectListPage from "./pages/pre-built/projects/ProjectList";
import { UserContextProvider } from "./pages/pre-built/user-manage/UserContext";
import UserListRegularPage from "./pages/pre-built/user-manage/UserListRegular";
import UserListCompact from "./pages/pre-built/user-manage/UserListCompact";
import UserDetailsPage from "./pages/pre-built/user-manage/UserDetailsRegular";
import UserProfileLayout from "./pages/pre-built/user-manage/UserProfileLayout";
import UserContactCardPage from "./pages/pre-built/user-manage/UserContactCard";
import KycListRegular from "./pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "./pages/pre-built/kyc-list-regular/kycDetailsRegular";
import TransListBasic from "./pages/pre-built/trans-list/TransListBasic";
import TransListCrypto from "./pages/pre-built/trans-list/TransListCrypto";
import ProductList from "./pages/pre-built/products/ProductList";
import { ProductContextProvider } from "./pages/pre-built/products/ProductContext";
import ProductCard from "./pages/pre-built/products/ProductCard";
import ProductDetails from "./pages/pre-built/products/ProductDetails";
import InvoiceList from "./pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "./pages/pre-built/invoice/InvoiceDetails";
import PricingTable from "./pages/pre-built/pricing-table/PricingTable";
import GalleryCardPreview from "./pages/pre-built/gallery/GalleryCardPreview";
import Regularv1 from "./pages/others/Regular-1";
import Regularv2 from "./pages/others/Regular-2";
import AppMessages from "./pages/app/messages/Messages";
import Calender from "./pages/app/calender/Calender";
import { FileManagerContextProvider } from "./pages/app/file-manager/FileManagerContext";
import FileManager from "./pages/app/file-manager/FileManager";
import Inbox from "./pages/app/inbox/Inbox";
import Kanban from "./pages/app/kanban/Kanban";
import ComponentsPage from "./pages/components/Index";
import { Accordian } from "./components/Component";
import AlertsPage from "./pages/components/Alerts";
import Avatar from "./pages/components/Avatar";
import BadgesPage from "./pages/components/Badges";
import BreadcrumbsPage from "./pages/components/Breadcrumbs";
import ButtonGroupPage from "./pages/components/ButtonGroup";
import ButtonsPage from "./pages/components/Buttons";
import CardsPage from "./pages/components/Cards";
import CarouselPage from "./pages/components/Carousel";
import DropdownsPage from "./pages/components/Dropdowns";
import FormElementsPage from "./pages/components/forms/FormElements";
import FormLayoutsPage from "./pages/components/forms/FormLayouts";
import CheckboxRadio from "./pages/components/forms/CheckboxRadio";
import AdvancedControls from "./pages/components/forms/AdvancedControls";
import InputGroup from "./pages/components/forms/InputGroup";
import FormUpload from "./pages/components/forms/FormUpload";
import NumberSpinner from "./pages/components/forms/NumberSpinner";
import FormValidation from "./pages/components/forms/FormValidation";
import DateTimePicker from "./pages/components/forms/DateTimePicker";
import ModalsPage from "./pages/components/Modals";
import PaginationPage from "./pages/components/Pagination";
import PopoversPage from "./pages/components/Popovers";
import ProgressPage from "./pages/components/Progress";
import SpinnerPage from "./pages/components/Spinner";
import TabsPage from "./pages/components/Tabs";
import ToastPage from "./pages/components/Toast";
import TooltipsPage from "./pages/components/Tooltips";
import Typography from "./pages/components/Typography";
import NouiSlider from "./pages/components/forms/nouislider";
import WizardForm from "./pages/components/forms/WizardForm";
import QuillPreview from "./pages/components/forms/rich-editor/QuillPreview";
import TinymcePreview from "./pages/components/forms/rich-editor/TinymcePreview";
import CardWidgets from "./pages/components/widgets/CardWidgets";
import ChartWidgets from "./pages/components/widgets/ChartWidgets";
import RatingWidgets from "./pages/components/widgets/RatingWidgets";
import SlickPage from "./pages/components/misc/Slick";
import SweetAlertPage from "./pages/components/misc/SweetAlert";
import BeautifulDnd from "./pages/components/misc/BeautifulDnd";
import DualListPage from "./pages/components/misc/DualListbox";
import GoogleMapPage from "./pages/components/misc/GoogleMap";
import ReactToastify from "./pages/components/misc/ReactToastify";
import JsTreePreview from "./pages/components/misc/JsTree";
import BasicTable from "./pages/components/table/BasicTable";
import DataTablePage from "./pages/components/table/DataTable";
import SpecialTablePage from "./pages/components/table/SpecialTable";
import ChartPage from "./pages/components/charts/Charts";
import KnobPreview from "./pages/components/charts/KnobPreview";
import EmailTemplate from "./pages/components/email-template/Email";
import NioIconPage from "./pages/components/crafted-icons/NioIcon";
import SVGIconPage from "./pages/components/crafted-icons/SvgIcons";
import Homepage from "./pages/Homepage";
import Chat from "./pages/app/chat/Chat";
import CryptoHomePage from "./pages/Crypto";
import { AllBuses, ScheduledBuses } from "./pages/buses";

const App = () => {
  return (
    <Routes>
      {/* Auth Pages */}
      <Route exact path={`/auth-success`} element={<Success />}></Route>
      <Route exact path={`/auth-reset`} element={<ForgotPassword />}></Route>
      <Route exact path={`/auth-register`} element={<Register />}></Route>
      <Route exact path={`/auth-login`} element={<Login />}></Route>

      {/* Print Pages */}
      <Route exact path={`/invoice-print/:id`} element={<InvoicePrint />}></Route>

      {/* Helper pages */}
      <Route exact path={`/auths/terms`} element={<Terms />}></Route>
      <Route exact path={`/auths/faq`} element={<Faq />}></Route>

      <Route exact path={`/invoice-print`} element={<InvoicePrint />}></Route>

      {/*Error Pages*/}
      <Route exact path={`/errors/404-classic`} element={<Error404Classic />}></Route>
      <Route exact path={`/errors/504-modern`} element={<Error504Modern />}></Route>
      <Route exact path={`/errors/404-modern`} element={<Error404Modern />}></Route>
      <Route exact path={`/errors/504-classic`} element={<Error504Classic />}></Route>

      {/*Main Routes*/}
      <Route path="/" element={<PrivateRoute></PrivateRoute>}>
        {/* <Routes> */}
        {/*Dashboards*/}
        <Route exact path={`/crypto`} element={<CryptoHomePage />}></Route>
        <Route exact path={`/analytics`} element={<AnalyticsHomePage />}></Route>
        <Route exact path={`/invest`} element={<InvestHomePage />}></Route>
        <Route exact path={`/_blank`} element={<BlankPage />}></Route>
        {/*Pre-built Pages*/}
        <Route exact path={`/all-buses`} element={<AllBuses />}></Route>
        <Route exact path={`/scheduled-buses`} element={<ScheduledBuses />}></Route>
        {/* <Route exact path={`/project-card`} element={<ProjectCardPage />}></Route>
        <Route exact path={`/project-list`} element={<ProjectListPage />}></Route> */}
        <Route //Context Api added
          exact
          path={`/user-list-regular`}
          render={() => (
            <UserContextProvider>
              <UserListRegularPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`/user-list-compact`}
          render={() => (
            <UserContextProvider>
              <UserListCompact />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`/user-details-regular/:id`}
          render={(props) => (
            <UserContextProvider>
              <UserDetailsPage {...props} />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`/user-profile`} element={<UserProfileLayout />}></Route>
        <Route exact path={`/update-profile`} element={<UserProfileLayout />}></Route>{" "}
        {/*need to change element to update user layout */}
        <Route exact path={`/user-profile-notification/`} element={<UserProfileLayout />}></Route>
        <Route exact path={`/user-profile-activity/`} element={<UserProfileLayout />}></Route>
        <Route exact path={`/user-profile-setting/`} element={<UserProfileLayout />}></Route>
        <Route //Context api added
          exact
          path={`/user-contact-card`}
          render={() => (
            <UserContextProvider>
              <UserContactCardPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`/kyc-list-regular`} element={<KycListRegular />}></Route>
        <Route exact path={`/kyc-details-regular/:id`} element={<KycDetailsRegular />}></Route>
        <Route exact path={`/transaction-basic`} element={<TransListBasic />}></Route>
        <Route exact path={`/transaction-crypto`} element={<TransListCrypto />}></Route>
        <Route exact path={`/product-list`} element={<ProductList />}></Route>
        <Route // context api added
          exact
          path={`/product-card`}
          render={(props) => (
            <ProductContextProvider>
              <ProductCard />
            </ProductContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/product-details/:id`}
          render={(props) => (
            <ProductContextProvider>
              <ProductDetails {...props} />
            </ProductContextProvider>
          )}
        ></Route>
        <Route exact path={`/invoice-list`} element={<InvoiceList />}></Route>
        <Route exact path={`/invoice-details/:id`} element={<InvoiceDetails match={{ params: {} }} />}></Route>
        <Route exact path={`/pricing-table`} element={<PricingTable />}></Route>
        <Route exact path={`/image-gallery`} element={<GalleryCardPreview />}></Route>
        {/*Demo Pages*/}
        <Route exact path={`/terms-policy`} element={<Terms />}></Route>
        <Route exact path={`/faq`} element={<Faq />}></Route>
        <Route exact path={`/pages/regular-v1`} element={<Regularv1 />}></Route>
        <Route exact path={`/pages/regular-v2`} element={<Regularv2 />}></Route>
        {/*Application*/}
        <Route exact path={`/app-messages`} element={<AppMessages />}></Route>
        <Route exact path={`/app-chat`} element={<Chat />}></Route>
        <Route exact path={`/app-calender`} element={<Calender />}></Route>
        <Route
          exact
          path={`/app-file-manager`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/files`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/shared`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/starred`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/recovery`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/settings`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/pricing`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`/app-file-manager/folder/:id`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route exact path={`/app-inbox`} element={<Inbox />}></Route>
        <Route exact path={`/app-kanban`} element={<Kanban />}></Route>
        {/*Components*/}
        <Route exact path={`/components`} element={<ComponentsPage />}></Route>
        <Route exact path={`/components/accordions`} element={<Accordian />}></Route>
        <Route exact path={`/components/alerts`} element={<AlertsPage />}></Route>
        <Route exact path={`/components/avatar`} element={<Avatar />}></Route>
        <Route exact path={`/components/badges`} element={<BadgesPage />}></Route>
        <Route exact path={`/components/breadcrumbs`} element={<BreadcrumbsPage />}></Route>
        <Route exact path={`/components/button-group`} element={<ButtonGroupPage />}></Route>
        <Route exact path={`/components/buttons`} element={<ButtonsPage />}></Route>
        <Route exact path={`/components/cards`} element={<CardsPage />}></Route>
        <Route exact path={`/components/carousel`} element={<CarouselPage />}></Route>
        <Route exact path={`/components/dropdowns`} element={<DropdownsPage />}></Route>
        <Route exact path={`/components/form-elements`} element={<FormElementsPage />}></Route>
        <Route exact path={`/components/form-layouts`} element={<FormLayoutsPage />}></Route>
        <Route exact path={`/components/checkbox-radio`} element={<CheckboxRadio />}></Route>
        <Route exact path={`/components/advanced-control`} element={<AdvancedControls />}></Route>
        <Route exact path={`/components/input-group`} element={<InputGroup />}></Route>
        <Route exact path={`/components/form-upload`} element={<FormUpload />}></Route>
        <Route exact path={`/components/number-spinner`} element={<NumberSpinner />}></Route>
        <Route exact path={`/components/form-validation`} element={<FormValidation />}></Route>
        <Route exact path={`/components/datetime-picker`} element={<DateTimePicker />}></Route>
        <Route exact path={`/components/modals`} element={<ModalsPage />}></Route>
        <Route exact path={`/components/pagination`} element={<PaginationPage />}></Route>
        <Route exact path={`/components/popovers`} element={<PopoversPage />}></Route>
        <Route exact path={`/components/progress`} element={<ProgressPage />}></Route>
        <Route exact path={`/components/spinner`} element={<SpinnerPage />}></Route>
        <Route exact path={`/components/tabs`} element={<TabsPage />}></Route>
        <Route exact path={`/components/toast`} element={<ToastPage />}></Route>
        <Route exact path={`/components/tooltips`} element={<TooltipsPage />}></Route>
        <Route exact path={`/components/typography`} element={<Typography />}></Route>
        <Route exact path={`/components/noUislider`} element={<NouiSlider />}></Route>
        <Route exact path={`/components/wizard-basic`} element={<WizardForm />}></Route>
        <Route exact path={`/components/quill`} element={<QuillPreview />}></Route>
        <Route exact path={`/components/tinymce`} element={<TinymcePreview />}></Route>
        <Route exact path={`/components/widgets/cards`} element={<CardWidgets />}></Route>
        <Route exact path={`/components/widgets/charts`} element={<ChartWidgets />}></Route>
        <Route exact path={`/components/widgets/rating`} element={<RatingWidgets />}></Route>
        <Route exact path={`/components/misc/slick-slider`} element={<SlickPage />}></Route>
        <Route exact path={`/components/misc/sweet-alert`} element={<SweetAlertPage />}></Route>
        <Route exact path={`/components/misc/beautiful-dnd`} element={<BeautifulDnd />}></Route>
        <Route exact path={`/components/misc/dual-list`} element={<DualListPage />}></Route>
        <Route exact path={`/components/misc/map`} element={<GoogleMapPage />}></Route>
        <Route exact path={`/components/misc/toastify`} element={<ReactToastify />}></Route>
        <Route exact path={`/components/misc/jsTree`} element={<JsTreePreview />}></Route>
        {/* <Route exact path={`/components/util-border`} element={<UtilBorder />}></Route> */}
        {/* <Route exact path={`/components/util-colors`} element={<UtilColors />}></Route> */}
        {/* <Route exact path={`/components/util-display`} element={<UtilDisplay />}></Route> */}
        {/* <Route exact path={`/components/util-embeded`} element={<UtilEmbeded />}></Route> */}
        {/* <Route exact path={`/components/util-flex`} element={<UtilFlex />}></Route> */}
        {/* <Route exact path={`/components/util-others`} element={<UtilOthers />}></Route> */}
        {/* <Route exact path={`/components/util-sizing`} element={<UtilSizing />}></Route> */}
        {/* <Route exact path={`/components/util-spacing`} element={<UtilSpacing />}></Route> */}
        {/* <Route exact path={`/components/util-text`} element={<UtilText />}></Route> */}
        <Route exact path={`/table-basic`} element={<BasicTable />}></Route>
        <Route exact path={`/table-datatable`} element={<DataTablePage />}></Route>
        <Route exact path={`/table-special`} element={<SpecialTablePage />}></Route>
        <Route exact path={`/charts/chartjs`} element={<ChartPage />}></Route>
        <Route exact path={`/charts/knobs`} element={<KnobPreview />}></Route>
        <Route exact path={`/email-template`} element={<EmailTemplate />}></Route>
        <Route exact path={`/nioicon`} element={<NioIconPage />}></Route>
        <Route exact path={`/svg-icons`} element={<SVGIconPage />}></Route>
        <Route exact index element={<Homepage />}></Route>
        <Route path="*" element={<Error404Modern />}></Route>
        {/* </Routes> */}
      </Route>
      {/* End Main Routes */}
      <Route path="*" element={<Error404Modern />}></Route>
    </Routes>
  );
};
export default App;
