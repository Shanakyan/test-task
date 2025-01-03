import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Container } from "../Container/Container";

export function Layout() {
  return (
    <>
      <Header />
      <main >
        <Container >
          <Outlet /> {/* Сюда рендерим контент страниц */}
        </Container>
      </main>
      <Footer />
    </>
  );
}
