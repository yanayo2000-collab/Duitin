import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/Home";
import { JobMarket } from "./components/JobMarket";
import { Withdrawal } from "./components/Withdrawal";
import { Profile } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";
import { Invite } from "./components/Invite";
import { WatchVideo } from "./components/WatchVideo";
import { Survey } from "./components/Survey";
import { DownloadApp } from "./components/DownloadApp";
import { ProductReview } from "./components/ProductReview";
import { MyWallet } from "./components/MyWallet";
import { TaskHistory } from "./components/TaskHistory";
import { Help } from "./components/Help";
import { TermsPrivacy } from "./components/TermsPrivacy";
import { CustomerService } from "./components/CustomerService";
import { ChatHistory } from "./components/ChatHistory";
import { SubmitTicket } from "./components/SubmitTicket";
import { RateService } from "./components/RateService";
import { Login } from "./components/Login";
import { ForgotPassword } from "./components/ForgotPassword";
import { WithdrawalHistory } from "./components/WithdrawalHistory";
import { Services } from "./components/Services";
import { TaskDetail } from "./components/TaskDetail";
import { WithdrawSuccess } from "./components/WithdrawSuccess";
import { History } from "./components/History";
import { Notifications } from "./components/Notifications";
import { Settings } from "./components/Settings";
import { DeleteAccount } from "./components/DeleteAccount";
import { VIPTaskDetail } from "./components/VIPTaskDetail";
import { RedirectToTasks } from "./components/RedirectToTasks";
import { AdminWithdrawals } from "./components/AdminWithdrawals";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "tasks", Component: JobMarket },
      { path: "jobs", Component: RedirectToTasks },
      { path: "withdrawal", Component: Withdrawal },
      { path: "profile", Component: Profile },
      { path: "edit-profile", Component: EditProfile },
      { path: "invite", Component: Invite },
      { path: "watch-video", Component: WatchVideo },
      { path: "survey", Component: Survey },
      { path: "download-app", Component: DownloadApp },
      { path: "product-review", Component: ProductReview },
      { path: "my-wallet", Component: MyWallet },
      { path: "withdrawal-history", Component: WithdrawalHistory },
      { path: "task-history", Component: TaskHistory },
      { path: "help", Component: Help },
      { path: "terms-privacy", Component: TermsPrivacy },
      { path: "customer-service", Component: CustomerService },
      { path: "chat-history", Component: ChatHistory },
      { path: "submit-ticket", Component: SubmitTicket },
      { path: "rate-service", Component: RateService },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "services", Component: Services },
      { path: "task-detail", Component: TaskDetail },
      { path: "withdraw-success", Component: WithdrawSuccess },
      { path: "history", Component: History },
      { path: "notifications", Component: Notifications },
      { path: "settings", Component: Settings },
      { path: "delete-account", Component: DeleteAccount },
      { path: "vip-task-detail", Component: VIPTaskDetail },
      { path: "admin/withdrawals", Component: AdminWithdrawals },
    ],
  },
]);