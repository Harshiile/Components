import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

export const TimePicker = ({ value, onChange, id, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState(value ? parseInt(value.split(':')[0]) : 0);
    const [selectedMinute, setSelectedMinute] = useState(value ? parseInt(value.split(':')[1]) : 0);
    const [period, setPeriod] = useState(selectedHour >= 12 ? 'PM' : 'AM');
    const clockRef = useRef < HTMLDivElement > (null);

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (clockRef.current && !clockRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleHourSelect = (hour: number) => {
        const newHour = period === 'PM' ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
        setSelectedHour(newHour);
        const formattedHour = newHour.toString().padStart(2, '0');
        const formattedMinute = selectedMinute.toString().padStart(2, '0');
        onChange(`${formattedHour}:${formattedMinute}`);
    };

    const handleMinuteSelect = (minute: number) => {
        setSelectedMinute(minute);
        const formattedHour = selectedHour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        onChange(`${formattedHour}:${formattedMinute}`);
    };

    const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
        setPeriod(newPeriod);
        const hour = selectedHour % 12;
        const newHour = newPeriod === 'PM' ? (hour === 0 ? 12 : hour + 12) : (hour === 0 ? 0 : hour);
        setSelectedHour(newHour);
        const formattedHour = newHour.toString().padStart(2, '0');
        const formattedMinute = selectedMinute.toString().padStart(2, '0');
        onChange(`${formattedHour}:${formattedMinute}`);
    };

    const formatDisplayTime = () => {
        const hour = selectedHour % 12 || 12;
        const minute = selectedMinute.toString().padStart(2, '0');
        return `${hour}:${minute} ${period}`;
    };

    return (
        <div className="relative" ref={clockRef}>
            <div className="relative">
                <input
                    type="text"
                    id={id}
                    value={formatDisplayTime()}
                    readOnly
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-2 bg-zinc-900 border border-white/10 rounded-lg text-white 
                   placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 
                   focus:border-transparent transition-all duration-200 cursor-pointer"
                    required={required}
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
            </div>

            <div
                className={`absolute mt-2 w-64 bg-zinc-900 rounded-lg shadow-xl border border-white/10 
                    transition-all duration-300 transform origin-top z-50
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                <div className="p-4 flex gap-4">
                    {/* Hours Column */}
                    <div className="flex-1">
                        <div className="text-white/50 text-sm mb-2">Hour</div>
                        <div className="h-48 overflow-y-auto custom-scrollbar">
                            {hours.map((hour) => (
                                <button
                                    key={hour}
                                    onClick={() => handleHourSelect(hour)}
                                    className={`w-full px-3 py-2 text-left rounded-md transition-colors duration-200
                    ${(selectedHour % 12 || 12) === hour
                                            ? 'bg-blue-500 text-white'
                                            : 'text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    {hour}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Minutes Column */}
                    <div className="flex-1">
                        <div className="text-white/50 text-sm mb-2">Minute</div>
                        <div className="h-48 overflow-y-auto custom-scrollbar">
                            {minutes.map((minute) => (
                                <button
                                    key={minute}
                                    onClick={() => handleMinuteSelect(minute)}
                                    className={`w-full px-3 py-2 text-left rounded-md transition-colors duration-200
                    ${selectedMinute === minute
                                            ? 'bg-blue-500 text-white'
                                            : 'text-white/70 hover:bg-white/10'
                                        }`}
                                >
                                    {minute.toString().padStart(2, '0')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AM/PM Column */}
                    <div className="flex flex-col gap-2">
                        <div className="text-white/50 text-sm mb-2">Period</div>
                        <button
                            onClick={() => handlePeriodChange('AM')}
                            className={`px-3 py-2 rounded-md transition-colors duration-200
                ${period === 'AM'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            AM
                        </button>
                        <button
                            onClick={() => handlePeriodChange('PM')}
                            className={`px-3 py-2 rounded-md transition-colors duration-200
                ${period === 'PM'
                                    ? 'bg-blue-500 text-white'
                                    : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            PM
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}