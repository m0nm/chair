export const Footer = ({ t }: { t: any }) => {
  return (
    <footer className="bg-transparent">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between rtl:md:flex-row-reverse">
        <span className="flex gap-1 text-sm text-gray-500 rtl:flex-row-reverse dark:text-gray-400 sm:text-center">
          © 2023{" "}
          <a href="https://github.com/m0nm" className="hover:underline">
            Chair™
          </a>
          . {t("copyright")}.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              {t("about")}
            </a>
          </li>
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              {t("privacyPolicy")}
            </a>
          </li>
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              {t("licening")}
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              {t("contact")}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
