"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";

type LinkMenu = {
  name: string;
  link: string;
};

type HeaderProps = {
  data?: any;
};

const Header = ({ data }: HeaderProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const linkMenu: LinkMenu[] = [
    { name: "HOME", link: "#hero" },
    { name: "PROFILE", link: "#profile" },
    { name: "EVENT ORDER", link: "#eventorder" },
    { name: "DRESS CODE", link: "#dresscode" },
    { name: "GALLERY", link: "#gallery" },
    { name: "RSVP", link: "#rsvp" },
    { name: "FAQ", link: "#faq" },
    { name: "WISHES", link: "#wishes" },
  ];

  const container: Variants = {
    hidden: {
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10, skewX: -10 },
    show: {
      opacity: 1,
      x: 0,
      skewX: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-[99] px-4 py-3 lg:left-2 lg:right-0 lg:w-[435px] lg:px-8 lg:pt-[22px]"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {/* HAMBURGER */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="text-[#C3C3C3] text-[28px] lg:text-[44px]"
        >
          <FiMenu />
        </motion.button>
      )}

      {/* DROPDOWN */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{ originX: 0, originY: 0 }}
            className="absolute top-[12px] left-[18px] lg:top-[30px] lg:left-[34px] bg-[#7B7B7B]/70 py-4 px-5 lg:pt-[59px] lg:px-[40px] text-white w-[255px] lg:w-[424px]"
          >
            {/* CLOSE X */}
            <motion.button
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-[-8px] left-[7px] lg:top-[-10px] lg:left-[11px]"
            >
              <p className="text-[30px] lg:text-[50px] text-white font-ibm font-light">
                x
              </p>
            </motion.button>

            {/* MENU */}
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="pt-3.5 pl-3 lg:pt-0 lg:pl-3 space-y-1.5 lg:space-y-2 text-[12px] lg:text-[18px] font-sans  text-white font-medium flex flex-col"
            >
              {linkMenu.map((menu: LinkMenu) => (
                <motion.a
                  key={menu.name}
                  href={menu.link}
                  variants={itemVariants}
                  onClick={() => setTimeout(() => setOpen(false), 200)}
                  className="group relative flex items-center cursor-pointer"
                >
                  <span className="absolute left-0 opacity-0 transition-all duration-500 ease-out group-hover:opacity-100">
                    →
                  </span>
                  <span className="transition-all duration-300 ease-out group-hover:translate-x-[22px] lg:group-hover:translate-x-[28px]">
                    {menu.name}
                  </span>
                </motion.a>
              ))}
            </motion.ul>

            {/* TEXT BAWAH */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              className="pt-[20px] lg:pt-[28px] pl-3 text-[8px] lg:text-[14px] font-sans font-light  pb-2 lg:pb-4 tracking-wide"
            >
              Select a section above to continue
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
