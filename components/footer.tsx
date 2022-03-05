import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <a
              href="https://ebcrowder.dev/feed.xml"
              className="mx-3 font-bold hover:underline"
            >
              RSS
            </a>
            <a
              href="https://github.com/ebcrowder"
              className="mx-3 font-bold hover:underline"
            >
              GitHub
            </a>
            <a
              href="mailto:eric@ebcrowder.dev"
              className="mx-3 font-bold hover:underline"
            >
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
