import EmailComponent from "../components/email";
import HeaderComponent from "../components/header";
import ResizablePanelComponent from "../components/panel";
import StepsComponent from "../components/steps";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <div className="grid grid-cols-2 gap-20">
        <div className="h-[264px]">
          <StepsComponent />
        </div>
        <div className="h-[264px]">
          <EmailComponent />
        </div>
        <div className="h-[264px]">
          <HeaderComponent />
        </div>
        <div className="h-72">
          <ResizablePanelComponent />
        </div>
      </div>
    </div>
  );
}
