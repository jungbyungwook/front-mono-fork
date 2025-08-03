import { UserSearchForm } from "@/features/user-search/ui/UserSearchForm";
import { Banner } from "@/widgets/Banner";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen pt-[60px] bg-[url('/images/home-background.png')] bg-cover bg-center bg-no-repeat">
      <main className="flex-grow flex justify-center pb-[520px] px-5 lg:px-0">
        <div>
          <div className="h-10 lg:h-40" />
          <Banner />
          <div className="h-6" />
          <UserSearchForm />
        </div>
      </main>
    </div>
  );
};
