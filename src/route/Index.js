import React, { Suspense, useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";
import Crypto from "../pages/Crypto";
import Analytics from "../pages/Analytics";
import Invest from "../pages/Invest";

import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Avatar from "../pages/components/Avatar";
import Badges from "../pages/components/Badges";
import Breadcrumbs from "../pages/components/Breadcrumbs";
import ButtonGroup from "../pages/components/ButtonGroup";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Carousel from "../pages/components/Carousel";
import Dropdowns from "../pages/components/Dropdowns";
import FormElements from "../pages/components/forms/FormElements";
import FormLayouts from "../pages/components/forms/FormLayouts";
import FormValidation from "../pages/components/forms/FormValidation";
import DataTablePage from "../pages/components/table/DataTable";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import Typography from "../pages/components/Typography";
import CheckboxRadio from "../pages/components/forms/CheckboxRadio";
import AdvancedControls from "../pages/components/forms/AdvancedControls";
import InputGroup from "../pages/components/forms/InputGroup";
import FormUpload from "../pages/components/forms/FormUpload";
import NumberSpinner from "../pages/components/forms/NumberSpinner";
import NouiSlider from "../pages/components/forms/nouislider";
import WizardForm from "../pages/components/forms/WizardForm";
import UtilBorder from "../pages/components/UtilBorder";
import UtilColors from "../pages/components/UtilColors";
import UtilDisplay from "../pages/components/UtilDisplay";
import UtilEmbeded from "../pages/components/UtilEmbeded";
import UtilFlex from "../pages/components/UtilFlex";
import UtilOthers from "../pages/components/UtilOthers";
import UtilSizing from "../pages/components/UtilSizing";
import UtilSpacing from "../pages/components/UtilSpacing";
import UtilText from "../pages/components/UtilText";

import Blank from "../pages/others/Blank";
import Faq from "../pages/others/Faq";
import Regularv1 from "../pages/others/Regular-1";
import Regularv2 from "../pages/others/Regular-2";
import Terms from "../pages/others/Terms";
import BasicTable from "../pages/components/table/BasicTable";
import SpecialTablePage from "../pages/components/table/SpecialTable";
import ChartPage from "../pages/components/charts/Charts";
import EmailTemplate from "../pages/components/email-template/Email";
import NioIconPage from "../pages/components/crafted-icons/NioIcon";
import SVGIconPage from "../pages/components/crafted-icons/SvgIcons";

import ProjectCardPage from "../pages/pre-built/projects/ProjectCard";
import ProjectListPage from "../pages/pre-built/projects/ProjectList";
import UserListRegularPage from "../pages/pre-built/user-manage/UserListRegular";
import UserContactCardPage from "../pages/pre-built/user-manage/UserContactCard";
import UserDetailsPage from "../pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "../pages/pre-built/user-manage/UserListCompact";
import UserProfileLayout from "../pages/pre-built/user-manage/UserProfileLayout";
import KycListRegular from "../pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "../pages/pre-built/kyc-list-regular/kycDetailsRegular";
import TransListBasic from "../pages/pre-built/trans-list/TransListBasic";
import TransListCrypto from "../pages/pre-built/trans-list/TransListCrypto";
import ProductCard from "../pages/pre-built/products/ProductCard";
import ProductList from "../pages/pre-built/products/ProductList";
import ProductDetails from "../pages/pre-built/products/ProductDetails";
import InvoiceList from "../pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "../pages/pre-built/invoice/InvoiceDetails";
import PricingTable from "../pages/pre-built/pricing-table/PricingTable";
import GalleryPreview from "../pages/pre-built/gallery/GalleryCardPreview";
import ReactToastify from "../pages/components/misc/ReactToastify";

import AppMessages from "../pages/app/messages/Messages";
import Chat from "../pages/app/chat/ChatContainer";
import Calender from "../pages/app/calender/Calender";
import FileManager from "../pages/app/file-manager/FileManager";
import Inbox from "../pages/app/inbox/Inbox";
import Kanban from "../pages/app/kanban/Kanban";
import DateTimePicker from "../pages/components/forms/DateTimePicker";
import CardWidgets from "../pages/components/widgets/CardWidgets";
import ChartWidgets from "../pages/components/widgets/ChartWidgets";
import RatingWidgets from "../pages/components/widgets/RatingWidgets";
import SlickPage from "../pages/components/misc/Slick";
import SweetAlertPage from "../pages/components/misc/SweetAlert";
import BeautifulDnd from "../pages/components/misc/BeautifulDnd";
import DualListPage from "../pages/components/misc/DualListbox";
import GoogleMapPage from "../pages/components/misc/GoogleMap";
import JsTreePreview from "../pages/components/misc/JsTree";
import QuillPreview from "../pages/components/forms/rich-editor/QuillPreview";
import TinymcePreview from "../pages/components/forms/rich-editor/TinymcePreview";
import KnobPreview from "../pages/components/charts/KnobPreview";
import { FileManagerContextProvider } from "../pages/app/file-manager/FileManagerContext";
import { AllBuses, ScheduledBuses } from "../pages/buses";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {/* <Routes> */}
      {/*Dashboards*/}
      <Route exact path={`/crypto`} element={<Crypto />}></Route>
      <Route exact path={`/analytics`} element={<Analytics />}></Route>
      <Route exact path={`/invest`} element={<Invest />}></Route>
      <Route exact path={`/_blank`} element={<Blank />}></Route>

      {/*Pre-built Pages*/}
      <Route exact path={`/project-card`} element={<ProjectCardPage />}></Route>
      {/* <Route exact path={`/project-list`} element={<ProjectListPage />}></Route> */}
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
      <Route exact path={`/user-profile-regular/`} element={<UserProfileLayout />}></Route>
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
      <Route exact path={`/invoice-details/:id`} element={<InvoiceDetails />}></Route>
      <Route exact path={`/pricing-table`} element={<PricingTable />}></Route>
      <Route exact path={`/image-gallery`} element={<GalleryPreview />}></Route>

      {/*Demo Pages*/}
      <Route exact path={`/pages/terms-policy`} element={<Terms />}></Route>
      <Route exact path={`/pages/faq`} element={<Faq />}></Route>
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
      <Route exact path={`/components`} element={<Component />}></Route>
      <Route exact path={`/components/accordions`} element={<Accordian />}></Route>
      <Route exact path={`/components/alerts`} element={<Alerts />}></Route>
      <Route exact path={`/components/avatar`} element={<Avatar />}></Route>
      <Route exact path={`/components/badges`} element={<Badges />}></Route>
      <Route exact path={`/components/breadcrumbs`} element={<Breadcrumbs />}></Route>
      <Route exact path={`/components/button-group`} element={<ButtonGroup />}></Route>
      <Route exact path={`/components/buttons`} element={<Buttons />}></Route>
      <Route exact path={`/components/cards`} element={<Cards />}></Route>
      <Route exact path={`/components/carousel`} element={<Carousel />}></Route>
      <Route exact path={`/components/dropdowns`} element={<Dropdowns />}></Route>
      <Route exact path={`/components/form-elements`} element={<FormElements />}></Route>
      <Route exact path={`/components/form-layouts`} element={<FormLayouts />}></Route>
      <Route exact path={`/components/checkbox-radio`} element={<CheckboxRadio />}></Route>
      <Route exact path={`/components/advanced-control`} element={<AdvancedControls />}></Route>
      <Route exact path={`/components/input-group`} element={<InputGroup />}></Route>
      <Route exact path={`/components/form-upload`} element={<FormUpload />}></Route>
      <Route exact path={`/components/number-spinner`} element={<NumberSpinner />}></Route>
      <Route exact path={`/components/form-validation`} element={<FormValidation />}></Route>
      <Route exact path={`/components/datetime-picker`} element={<DateTimePicker />}></Route>
      <Route exact path={`/components/modals`} element={<Modals />}></Route>
      <Route exact path={`/components/pagination`} element={<Pagination />}></Route>
      <Route exact path={`/components/popovers`} element={<Popovers />}></Route>
      <Route exact path={`/components/progress`} element={<Progress />}></Route>
      <Route exact path={`/components/spinner`} element={<Spinner />}></Route>
      <Route exact path={`/components/tabs`} element={<Tabs />}></Route>
      <Route exact path={`/components/toast`} element={<Toast />}></Route>
      <Route exact path={`/components/tooltips`} element={<Tooltips />}></Route>
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
      <Route exact path={`/components/util-border`} element={<UtilBorder />}></Route>
      <Route exact path={`/components/util-colors`} element={<UtilColors />}></Route>
      <Route exact path={`/components/util-display`} element={<UtilDisplay />}></Route>
      <Route exact path={`/components/util-embeded`} element={<UtilEmbeded />}></Route>
      <Route exact path={`/components/util-flex`} element={<UtilFlex />}></Route>
      <Route exact path={`/components/util-others`} element={<UtilOthers />}></Route>
      <Route exact path={`/components/util-sizing`} element={<UtilSizing />}></Route>
      <Route exact path={`/components/util-spacing`} element={<UtilSpacing />}></Route>
      <Route exact path={`/components/util-text`} element={<UtilText />}></Route>
      <Route exact path={`/table-basic`} element={<BasicTable />}></Route>
      <Route exact path={`/table-datatable`} element={<DataTablePage />}></Route>
      <Route exact path={`/table-special`} element={<SpecialTablePage />}></Route>
      <Route exact path={`/charts/chartjs`} element={<ChartPage />}></Route>
      <Route exact path={`/charts/knobs`} element={<KnobPreview />}></Route>
      <Route exact path={`/email-template`} element={<EmailTemplate />}></Route>
      <Route exact path={`/nioicon`} element={<NioIconPage />}></Route>
      <Route exact path={`/svg-icons`} element={<SVGIconPage />}></Route>
      <Route exact path={`/`} element={<Homepage />}></Route>
      <Route element={<RedirectAs404 />}></Route>
      {/* </Routes> */}
    </>
  );
};
export default Pages;
