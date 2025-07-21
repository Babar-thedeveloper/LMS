import React from 'react';
import { FaRegCalendarPlus, FaFirstAid, FaCalendarAlt } from 'react-icons/fa';

const policies = [
  {
    title: 'Casual Leaves',
    icon: <FaRegCalendarPlus size={28} className="text-white drop-shadow" />, 
    gradient: 'bg-gradient-to-r from-primary to-secondary',
    content: [
      'A regular employee is eligible with pay not exceeding ten (10) days in a year (Year initiation is January 1st and the conclusion is December 31st).',
      'Casual leaves shall not be granted for more than three (3) days.',
      'Casual leaves cannot be accumulated and balance un-availed leaves shall expire at the end of each calendar year.'
    ]
  },
  {
    title: 'Sick Leaves',
    icon: <FaFirstAid size={28} className="text-white drop-shadow" />, 
    gradient: 'bg-gradient-to-r from-secondary to-accent',
    content: [
      'A regular employee shall be entitled to ten (10) sick leave(s) in a calendar year.',
      'It is imperative that the employee provide a certificate from a Registered Medical Practitioner or ideally via the Bahria Town facility Hospital if the sick leave applied for is greater than three (3) days in succession.'
    ]
  },
  {
    title: 'Annual Leaves',
    icon: <FaCalendarAlt size={28} className="text-white drop-shadow" />, 
    gradient: 'bg-gradient-to-r from-accent to-primary',
    content: [
      'A regular employee shall be entitled to twenty (20) working days of annual leave per calendar year of service completed.',
      'Annual leaves shall not be granted for less than three (3) days.',
      'Annual leaves can only be availed thrice in a calendar year.',
      'A regular employee will be eligible for twenty (20) working days of annual leave per calendar year after completion of one year of service. Further, only last one year’s balanced annual leaves will be merged with the current year’s annual leaves.'
    ]
  }
];

const LeavePolicies = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center px-0 md:px-0 pt-2 md:pt-4 pb-8 animate-fade-in bg-base-200">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-full px-2 md:px-8">
      {policies.map((policy, idx) => (
        <div
          key={policy.title}
          className="card shadow-2xl rounded-2xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl bg-base-100 border border-base-300 animate-fade-in min-h-[420px] relative overflow-hidden"
          style={{ animationDelay: `${idx * 120}ms` }}
        >
          {/* Gradient bar with icon */}
          <div className={`rounded-t-2xl p-5 flex items-center gap-3 ${policy.gradient} shadow-lg relative z-10`}>
            <span className="bg-white/20 rounded-full p-2 flex items-center justify-center">{policy.icon}</span>
            <span className="font-bold text-lg md:text-xl tracking-wide text-white drop-shadow">{policy.title}</span>
          </div>
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/symphony.png')] bg-repeat rounded-2xl" />
          <div className="card-body p-8 flex flex-col gap-4 z-10 relative">
            <ul className="list-disc pl-5 space-y-2">
              {policy.content.map((line, i) => (
                <li key={i} className="text-base-content text-sm md:text-base leading-relaxed font-medium">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default LeavePolicies; 