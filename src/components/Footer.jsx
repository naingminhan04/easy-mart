export default function Footer() {
  return (
    <div className="bg-gray-100 border-black bottom-0 w-full mt-1">
      <div className="p-3">
        <div className="text-sm font-bold md:text-base mb-2">EasyMart</div>
        <div className="text-xs md:text-sm">
          Order Now, Pay Later — Myanmar’s No.1 trusted online shopping platform
          offering fast delivery and cash-on-delivery convenience.
        </div>
        
        <div className="pt-3 hidden sm:block">
          <div className="pb-1 text-sm md:text-base font-bold">Contact Us</div>
          <div className="text-xs md:text-sm flex flex-col">
            <a href="tel:+959921234685">
                    Phone: <span className="text-blue-400 underline">09 921-234-685</span>
                </a>
            <a href="mailto:support@easymart.com">Email: <span className="text-blue-400 underline">support@easymart.com</span></a>
            <div>No. 112, Cherry Street, Ward 5, Shwe Thiri Township, Yangon, Myanmar</div>
          </div>
        </div>
        
        <div className="pt-3 text-gray-600 text-xs opacity-70">
          Copyright © 2025 EasyMart Inc. All rights reserved.
        </div>
      </div>
    </div>
  );
}
