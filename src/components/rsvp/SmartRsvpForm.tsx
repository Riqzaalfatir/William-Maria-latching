// "use client";
// import Image from "next/image";

// const Loader = () => (
//   <div
//     className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
//     style={{ backgroundColor: '#E9E9E9A8' }}
//   //onClick={onClose}
//   >
//     <Image
//       alt="Load"
//       src={"/images/loader-trans.gif"}
//       width={150}
//       height={150}
//       unoptimized
//       onClick={(e) => e.stopPropagation()}
//     />
//   </div>
// );

// const ConfirmRsvpModal = ({
//   onClose,
//   onConfirm,
// }: {
//   onClose: () => void;
//   onConfirm: () => void;
// }) => (
//   <div
//     className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
//     style={{ backgroundColor: '#E9E9E9A8' }}
//     onClick={onClose}
//   >
//     <div
//       className="bg-white rounded-2xl shadow-2xl w-full max-w-[322px] mx-auto overflow-hidden"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Body */}
//       <div className="flex flex-col items-center px-7 pt-10 pb-7 text-center">
//         {/* Chat-bubble question-mark icon */}
//         <div className="mb-3" style={{ color: '#9CA3AF' }}>
//           <img src={"/templates/wedding-kenny-destiny/message-circle-question-mark.png"} alt="Chat bubble question mark" />
//         </div>

//         {/* Title */}
//         <h2
//           className="font-extrabold text-[4.103vw] md:text-[16px] font-noto mb-5"
//           style={{ fontSize: '0.9rem', color: '#605F5E' }}
//         >
//           CONFIRM RSVP
//         </h2>

//         {/* Indonesian */}
//         <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] mb-4" >
//           Apakah Anda yakin dengan pilihan RSVP ini?
//           Silakan lanjutkan untuk menyimpan
//           konfirmasi Anda.
//         </p>

//         {/* English */}
//         <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] w-[254px] mb-4" >
//           Are you sure about your RSVP selection?
//           Please proceed to submit your
//           confirmation.
//         </p>
//       </div>

//       {/* Pembatas horizontal */}
//       <div style={{ height: '1px', backgroundColor: '#E5E7EB' }} />

//       {/* Tombol aksi */}
//       <div className="flex font-noto">
//         <button
//           onClick={onClose}
//           className="flex-1 py-5 text-[3.59vw] md:text-[14px] leading-[16px]"
//           style={{ color: '#6B7280' }}
//         >
//           Close
//         </button>
//         {/* Pembatas vertikal */}
//         <div style={{ width: '1px', backgroundColor: '#E5E7EB' }} />
//         <button
//           onClick={onConfirm}
//           className="flex-1 py-5 text-[3.59vw] md:text-[14px] font-bold leading-[16px]"
//           style={{ color: '#605F5E' }}
//         >
//           Confirm
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const IncompleteRsvpModal = ({ onClose, title = "INCOMPLETE RSVP", indMessage, enMessage }: { onClose: () => void, title: string, indMessage: string, enMessage: string }) => (
//   <div
//     className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
//     style={{ backgroundColor: '#E9E9E9A8' }}
//     onClick={onClose}
//   >
//     <div
//       className="bg-white rounded-2xl shadow-2xl w-full max-w-[322px] mx-auto overflow-hidden"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Body */}
//       <div className="flex flex-col items-center px-7 pt-10 pb-7 text-center">
//         {/* Circle ! icon */}
//         <div className="mb-3" style={{ color: '#9CA3AF' }}>
//           <img src={'/templates/wedding-kenny-destiny/warning-circle.png'} alt="Incomplete RSVP" />
//         </div>

//         {/* Title */}
//         <h2
//           className="font-extrabold text-[4.103vw] md:text-[16px] font-noto mb-5"
//           style={{ fontSize: '0.9rem', color: '#605F5E' }}
//         >
//           {title}
//         </h2>

//         {/* Indonesian */}
//         <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] mb-4" >
//           {indMessage ?? "Mohon lengkapi data RSVP Anda sebelum melanjutkan. Beberapa informasi masih belum terisi."}
//         </p>

//         {/* English */}
//         <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] w-[254px] mb-8" >
//           {enMessage ?? "Please complete your RSVP details before proceeding. Some required information is still missing."}
//         </p>
//       </div>

//       {/* Horizontal divider */}
//       <div style={{ height: '1px', backgroundColor: '#E5E7EB' }} />

//       {/* Close button */}
//       <div className="flex font-noto">
//         <button
//           onClick={onClose}
//           className="flex-1 py-5 text-[3.59vw] md:text-[14px] leading-[16px]"
//           style={{ color: '#6B7280' }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const IncompleteSmartRsvpModal = ({ onClose, title = "INCOMPLETE RSVP", indMessage }: { onClose: () => void, title: string, indMessage: string }) => (
//   <div
//     className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
//     style={{ backgroundColor: '#E9E9E9A8' }}
//     onClick={onClose}
//   >
//     <div
//       className="bg-white rounded-2xl shadow-2xl w-full max-w-[322px] mx-auto overflow-hidden"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Body */}
//       <div className="flex flex-col items-center px-7 pt-10 pb-7 text-center">
//         {/* Circle ! icon */}
//         <div className="mb-3" style={{ color: '#9CA3AF' }}>
//           <img src={'/templates/wedding-kenny-destiny/warning-circle.png'} alt="Incomplete RSVP" />
//         </div>

//         {/* Title */}
//         <h2
//           className="font-extrabold text-[4.103vw] md:text-[16px] font-noto mb-5"
//           style={{ fontSize: '0.9rem', color: '#605F5E' }}
//         >
//           {title}
//         </h2>

//         {/* Indonesian */}
//         <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] mb-4" >
//           {indMessage ?? "Mohon lengkapi data RSVP Anda sebelum melanjutkan. Beberapa informasi masih belum terisi."}
//         </p>
//       </div>

//       {/* Horizontal divider */}
//       <div style={{ height: '1px', backgroundColor: '#E5E7EB' }} />

//       {/* Close button */}
//       <div className="flex font-noto">
//         <button
//           onClick={onClose}
//           className="flex-1 py-5 text-[3.59vw] md:text-[14px] leading-[16px]"
//           style={{ color: '#6B7280' }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const RsvpClosedModal = ({ onClose, whatsappNumber }: { onClose: () => void; whatsappNumber: string }) => {

//   return (
//     <div
//       className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
//       style={{ backgroundColor: '#E9E9E9A8' }}
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-[322px] mx-auto overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Body */}
//         <div className="flex flex-col items-center px-7 pt-10 pb-7 text-center">
//           {/* Chat-bubble question-mark icon */}
//           <div className="mb-3" style={{ color: '#9CA3AF' }}>
//             <img src={'/templates/wedding-kenny-destiny/warning-circle.png'} className="w-[63.57625198364258px] h-[67.4793701171875px]" alt="RSVP Closed" />
//           </div>

//           {/* Title */}
//           <h2
//             className="font-extrabold text-[4.103vw] md:text-[16px] font-noto mb-5"
//             style={{ fontSize: '0.9rem', color: '#605F5E' }}
//           >
//             RSVP CLOSED
//           </h2>

//           {/* Indonesian */}
//           <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] mb-4" >
//             Reservasi telah ditutup, terima kasih atas perhatian Anda. Jika membutuhkan bantuan, tim kami siap membantu.
//           </p>

//           {/* English */}
//           <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] w-[254px] mb-4" >
//             Reservations are now closed. Thank you for your attention. If you need any assistance, our team is here to help.
//           </p>
//         </div>

//         {/* Pembatas horizontal */}
//         <div style={{ height: '1px', backgroundColor: '#E5E7EB' }} />

//         {/* Tombol aksi */}
//         <div className="flex font-noto">
//           <button
//             onClick={onClose}
//             className="flex-1 py-5 text-[3.59vw] md:text-[14px] leading-[16px]"
//             style={{ color: '#6B7280' }}
//           >
//             Close
//           </button>
//           {/* Vertical divider */}
//           <div style={{ width: '1px', backgroundColor: '#E5E7EB' }} />
//           <a
//             href={whatsappNumber}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex-1 text-center py-5 text-[3.59vw] md:text-[14px] leading-[16px]"
//             style={{ color: '#605F5E' }}
//           >
//             Chat with Our Team
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ConfirmedRsvpModal = ({ onClose, title = "RSVP CONFIRMED", status }: { onClose: () => void, title: string, status: number }) => (
//   <div
//     className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
//     style={{ backgroundColor: '#E9E9E9A8' }}
//     onClick={onClose}
//   >
//     <div
//       className="bg-white rounded-2xl shadow-2xl w-full max-w-[322px] mx-auto overflow-hidden"
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Body */}
//       <div className="flex flex-col items-center px-7 pt-10 pb-7 text-center">
//         {/* Chat-bubble question-mark icon */}
//         <div className="mb-3" style={{ color: '#9CA3AF' }}>
//           <IconCheck />
//         </div>

//         {/* Title */}
//         <h2
//           className="font-extrabold text-[4.103vw] md:text-[16px] font-noto mb-5"
//           style={{ fontSize: '0.9rem', color: '#605F5E' }}
//         >
//           {title}
//         </h2>

//         {/* Indonesian */}
//         <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] mb-4" >
//           {status === 1 ? "Konfirmasi kehadiran Anda telah kami terima, kami menantikan kehadiran Anda. Terima kasih atas konfirmasi Anda." : "Konfirmasi ketidakhadiran Anda telah kami terima, terima kasih atas respon Anda. Kami menghargai pemberitahuan Anda."}
//         </p>

//         {/* English */}
//         <p className="text-[3.077vw] md:text-[12px] font-noto text-[#605F5E] font-medium leading-[16px] w-[254px] mb-4" >
//           {status === 1 ? "Your attendance has been confirmed, we look forward to welcoming you. Thank you for your confirmation." : "Your response has been received, thank you for your confirmation. We appreciate your response."}
//         </p>
//       </div>

//       {/* Pembatas horizontal */}
//       <div style={{ height: '1px', backgroundColor: '#E5E7EB' }} />

//       {/* Tombol aksi */}
//       <div className="flex font-noto">
//         <button
//           onClick={onClose}
//           className="flex-1 py-5 text-[3.59vw] md:text-[14px] leading-[16px]"
//           style={{ color: '#6B7280' }}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const IconCheck = () => (
//   <img
//     src="/templates/wedding-fani-akbar/popup/CeklisCircle.png"
//     alt="check"
//     className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
//   />
// );
// const IconWarning = () => (
//   <img
//     src="/templates/wedding-fani-akbar/popup/TandaSeru.png"
//     alt="warning"
//     className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
//   />
// );

// export {
//   Loader,
//   ConfirmRsvpModal,
//   IncompleteRsvpModal,
//   IncompleteSmartRsvpModal,
//   RsvpClosedModal,
//   ConfirmedRsvpModal,
// };
