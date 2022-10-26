import HostOnlyPage from "../components/ProtectedPages/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPages/ProtectedPage";

export default function UploadRoom() {
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <div></div>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
