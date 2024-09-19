import Header from "@/app/components/Header";
import Navigation from "@/app/components/Navigation";
import "@/app/assets/main.scss";


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="snb">
                <Navigation/>
            </div>
            <main>
                <Header/>
                {children}
            </main>
        </>
    );
}
