import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='bg-[#FDD998] mb-5'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-6'>
                {/* Logo */}
                <h1 className='text-2xl font-bold text-[#000B58]'>
                    Job<span className='text-[#FF6600]'>Seee</span>
                </h1>

                {/* Navigation Links */}
                <div className='flex items-center gap-12 text-[#000B58]'>
                    <ul className='flex font-medium items-center gap-5'>
                        {user?.role === 'recruiter' ? (
                            <>
                                <li>
                                    <Link
                                        to='/admin/companies'
                                        className='hover:text-[#FF6600] transition-all'
                                    >
                                        Companies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/admin/jobs'
                                        className='hover:text-[#FF6600] transition-all'
                                    >
                                        Jobs
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to='/'
                                        className='hover:text-[#FF6600] transition-all'
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/jobs'
                                        className='hover:text-[#FF6600] transition-all'
                                    >
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/browse'
                                        className='hover:text-[#FF6600] transition-all'
                                    >
                                        Browse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* User Actions */}
                    {!user ? (
                        <div className='flex items-center gap-4'>
                            <Link to='/login'>
                                <Button className='bg-[#FF6600] hover:bg-[#000B58] text-white'>
                                    Login
                                </Button>
                            </Link>
                            <Link to='/signup'>
                                <Button className='bg-[#FF6600] hover:bg-[#000B58] text-white'>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer'>
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt='user-profile'
                                        className='rounded-full border-2 border-[#FF6600]'
                                    />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 bg-white shadow-lg rounded-md border border-[#FF6600]'>
                                <div className='p-4'>
                                    {/* User Information */}
                                    <div className='flex gap-2 items-center'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt='user-profile' />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-[#FF6600]'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col my-4'>
                                        {user?.role === 'student' && (
                                            <div className='flex items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant='link' className='text-[#FF6600]'>
                                                    <Link to='/profile'>View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button
                                                onClick={logoutHandler}
                                                variant='link'
                                                className='text-[#FF6600]'
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

