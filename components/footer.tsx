import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-t border-neutral-200">
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
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
              Github
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
