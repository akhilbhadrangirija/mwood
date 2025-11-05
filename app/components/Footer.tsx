export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-primary via-secondary to-accent ">
      <div className="page-margin py-8 text-center">
        <p className="font-medium">
          &copy; {new Date().getFullYear()} MWood Cleaning Services. All Rights Reserved.
        </p>
        <p className="opacity-90">Dubai, UAE | info@mwooduae.com</p>
      </div>
    </footer>
  );
}