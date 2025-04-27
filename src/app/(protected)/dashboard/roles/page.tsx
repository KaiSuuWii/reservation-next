"use client";
import React from 'react';
import { Shield, Briefcase, Wrench, Lock, Headphones, Check, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAccount } from '../../provider';

export default function Roles() {
  const roles = [
    { id: 'uao', name: 'UAO', icon: Shield, description: 'University Activities Office', color: '#4F46E5' },
    { id: 'ppo', name: 'PPO', icon: Headphones, description: 'Public Performance Office', color: '#10B981' },
    { id: 'pe', name: 'P.E', icon: Briefcase, description: 'Physical Education', color: '#F59E0B' },
    // { id: 'security', name: 'Security', icon: Lock, description: 'Campus Security', color: '#EF4444' },
    { id: 'osa', name: 'OSA', icon: Wrench, description: 'Office of Student Affairs', color: '#8B5CF6' },
    { id: 'student', name: 'Student', icon: User, description: 'Student Dashboard', color: '#3B82F6' }, // Added Student role
  ];

  const [selectedRole, setSelectedRole] = React.useState<string | null>(null);
  const router = useRouter();
  const { updateSession, refreshToken } = useAccount();

  const handleSelectedRole = (roleId: string) => {
    setSelectedRole(roleId);
    console.log(`Selected role: ${roleId}`);
  };

  const handleContinueToDashboard = async () => {
    await updateSession(async () => {
        if (selectedRole) {
          const response = await fetch('/api/dashboard/roles', {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: selectedRole }),
          });

          if (response.ok) {
            console.log('Role updated successfully');
            refreshToken(); // Refresh the token after updating the role
          } 
          else {
            console.error('Failed to update role:', response.statusText);
          }
      }
    });
};

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        <div className="min-h-screen bg-[#283971] p-6 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-2 mt-30">Select Your Role</h2>
              <p className="text-md font-semibold text-[#FFFFFF] mb-8">
                Please note: Once you have chosen your role, you cannot change it later
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roles.map((role) => {
                  const isSelected = selectedRole === role.id;

                  return (
                    <div
                      key={role.id}
                      onClick={() => handleSelectedRole(role.id)}
                      className={`
                        bg-white rounded-[20px] overflow-hidden cursor-pointer
                        transform transition-all duration-300 relative
                        ${isSelected ?
                          'ring-4 ring-blue-400 ring-opacity-70 shadow-lg' :
                          'hover:border-gray-300 hover:shadow-md border-transparent shadow'
                        }
                        ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                      `}
                    >
                      {/* Glow effect container */}
                      {isSelected && (
                        <div className="absolute inset-0 rounded-[20px] pointer-events-none">
                          <div className="absolute inset-0 rounded-[20px] bg-blue-400 opacity-10 blur-md"></div>
                          <div className="absolute inset-0 rounded-[20px] border-2 border-blue-300 border-opacity-50"></div>
                        </div>
                      )}

                      <div className="p-8 flex flex-col items-center relative z-10">
                        <div
                          className={`p-4 rounded-full mb-6`}
                          style={{
                            backgroundColor: isSelected ? role.color : `${role.color}20`,
                            color: isSelected ? 'white' : role.color
                          }}
                        >
                          <role.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{role.name}</h3>
                        <p className="text-gray-500 text-sm text-center mb-4">{role.description}</p>

                        <div
                          className={`flex items-center justify-center py-2 px-4 rounded-full text-sm font-medium`}
                          style={{
                            backgroundColor: isSelected ? `${role.color}20` : '#f3f4f6',
                            color: isSelected ? role.color : '#6b7280'
                          }}
                        >
                          {isSelected ? (
                            <>
                              <Check size={16} className="mr-1" />
                              Selected
                            </>
                          ) : 'Click to select'}
                        </div>
                      </div>

                      <div
                        className={`h-1 w-full relative z-10`}
                        style={{ backgroundColor: isSelected ? role.color : '#e5e7eb' }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-8">
              {selectedRole && (
                <button
                  onClick={handleContinueToDashboard}
                  className="px-8 py-3 rounded-lg text-white font-medium transition-all bg-[#283971] hover:bg-[#1a2651] shadow-lg hover:scale-105 cursor-pointer"
                >
                  Continue to Dashboard
                </button>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}