import React from 'react';
import { Copy, CreditCard, Gift as GiftIcon, QrCode } from 'lucide-react';
import type { BankAccount } from '../types/invitation';

interface GiftProps {
  bankAccounts: BankAccount[];
}

const Gift: React.FC<GiftProps> = ({ bankAccounts }) => {
  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    alert('Nomor berhasil disalin!');
  };

  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800" id="gift">
      <div className="text-center mb-16">
        <h2 className="font-esthetic text-5xl text-primary" data-aos="fade-up">Love Gift</h2>
        <p className="mt-4 text-sm opacity-60 max-w-xs mx-auto" data-aos="fade-up" data-aos-delay="200">
          Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda kasih untuk kami, dapat melalui:
        </p>
      </div>

      <div className="space-y-6 max-w-sm mx-auto">
        {bankAccounts.map((account, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-700 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-600"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-xl text-primary">
                {account.type === 'transfer' && <CreditCard className="w-6 h-6" />}
                {account.type === 'qris' && <QrCode className="w-6 h-6" />}
                {account.type === 'gift' && <GiftIcon className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white uppercase text-xs tracking-widest">{account.bankName}</h3>
                <p className="text-sm opacity-60 font-medium">{account.name}</p>
              </div>
            </div>

            {account.type === 'transfer' && (
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl">
                <code className="text-lg font-bold tracking-wider">{account.accountNumber}</code>
                <button 
                  onClick={() => handleCopy(account.accountNumber)}
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors group"
                >
                  <Copy className="w-5 h-5 text-primary group-active:scale-90 transition-transform" />
                </button>
              </div>
            )}

            {account.type === 'qris' && account.qrCodeUrl && (
              <div className="flex flex-col items-center">
                <img src={account.qrCodeUrl} alt="QRIS" className="w-48 h-48 mb-4 rounded-xl border-4 border-white shadow-md bg-white p-2" />
                <button 
                   onClick={() => handleCopy(account.accountNumber)}
                   className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 px-6 py-2 rounded-full"
                >
                  <Copy className="w-4 h-4" />
                  Salin Nomor
                </button>
              </div>
            )}

            {account.type === 'gift' && (
              <div className="space-y-4">
                <p className="text-sm italic opacity-70">"{account.address}"</p>
                <button 
                   onClick={() => handleCopy(account.address || '')}
                   className="w-full flex items-center justify-center gap-2 text-primary font-bold text-sm bg-primary/10 py-3 rounded-full"
                >
                  <Copy className="w-4 h-4" />
                  Salin Alamat
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gift;
