import Modal from '@/components/Modal';
import { getUsers, registerUser } from '@/lib/apis';
import { PAGE_COUNT } from '@/lib/constants';
import { formatDate } from '@/lib/utils';
import { LockOutlined, NavigateBefore, NavigateNext } from '@mui/icons-material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Avatar, Box, Button, Container, TextField, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";

interface Order{
    "orderName": "BASIC" | "BONUS_CONTENT",
    "name": string,
    "contact": string,
    "paymentID": string,
    "createdAt": string
}

interface User{
    "username": string,
    "orders": Order[]
}

interface userFormInput{
    "email": string,
    "password": string,
}

interface pageMetaProps{
    count:number,
    prev: boolean,
    next:boolean
}

const Users: React.FC = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [pageMeta, setPageMeta] = useState<pageMetaProps>({});
    const [search, setSearch] = useState({term:"", page:1, sort:"asc"});
    const [addUserModal, toggleAddUserModal] = useState(false);
    const { register, handleSubmit } = useForm<userFormInput>();
    const searchRef = useRef('');

    useEffect(()=>{ 
        getUsers({searchTerm:search.term, page: search.page, sort:'asc'})
        .then( res => {
            setUsers( res.data.users );
            setPageMeta( prev => ({...prev,...res.data.meta}) );
        })
    },[search])


    async function submitNewUser( data: userFormInput ){
        const res = await registerUser( data.email, data.password );
        alert(res.message);
        toggleAddUserModal(prev => !prev);
    }

    function navigatePage( direction: 1 | -1 ){
        setSearch(prev => ({
            ...prev, 
            page: prev.page + direction
        }))
    }

    return(
        <section className="d-flex flex-column flex-grow-1 px-4 py-2 bg-black">
            <div className="bg-sub-layout rounded-4 d-flex justify-content-between px-2 pt-4 pb-3">
                {/* Search Bar */}
                <div className="input-group d-flex gap-3 flex-nowrap mx-4">
                    <div className="form">
                        <input ref={ searchRef } type="email" className="form-control bg-dark border-0 rounded-pill text-white" id="floatingInput" placeholder="dustykitten@gmail.com" />
                    </div>
                    <button className="btn bg-dark rounded-circle px-2 border-0 text-center align-middle" type="button" onClick={()=>{
                        setSearch(prev => ({...prev, term: searchRef.current.value, page: 1 })) 
                    }}>
                        <SearchRoundedIcon className='text-secondary fs-4' />
                    </button>
                </div>

                <button className="btn btn-warning px-4 rounded-1 text-nowrap fw-medium text-center align-middle" type="button" onClick={()=>toggleAddUserModal(true)}>
                    Add users
                </button>
            </div>
            <section className='bg-inherit pt-4 px-2 flex-grow-1'>
                <div className='mb-3 list-group list-group-horizontal'>
                    <div style={{backgroundColor:"#22262a"}} className='list-group-item text-light fw-semibold border-0'>
                        Sr.No
                    </div>
                    <div style={{backgroundColor:"#22262a"}} className='list-group-item w-25 text-light fw-semibold border-0'>
                        Email Address
                    </div>
                    <div style={{backgroundColor:"#22262a"}} className='list-group-item w-25 text-light fw-semibold border-0'>
                        CreatedAt
                    </div>
                    <div style={{backgroundColor:"#22262a"}} className='list-group-item flex-fill text-light fw-semibold border-0'>
                        Plan
                    </div>
                </div>
                {
                    users && users.map((user:User,index:number) => {
                        const orders = user.orders.length > 0 ? user.orders : null;
                        
                        return(
                            <div key={index} className="mb-2 list-group list-group-horizontal list-group-flush" >
                                <div className='list-group-item list-group-bg'>
                                    { (search.page - 1) * PAGE_COUNT + ( index + 1 ) }
                                </div>
                                <div className='list-group-item w-25 list-group-bg'>
                                    { user?.username }
                                </div>
                                <div className='list-group-item w-25 list-group-bg'>
                                    { orders && formatDate( new Date(orders[0]["createdAt"]) ) }
                                </div>
                                <div className='list-group-item flex-fill list-group-bg'>
                                    { orders && orders[orders.length-1]["orderName"] || 'BASIC' }
                                </div>
                            </div>
                        )
                    })
                }
            </section>
            <section className='bg-dark mb-3 mx-2 px-3 py-1'> 
                <div className='d-flex justify-content-end align-items-center'>
                    <div>Page { search.page } of { Math.ceil(pageMeta.count / PAGE_COUNT) }</div>
                    <Button disabled={ !pageMeta?.prev} color="inherit" onClick={()=>{ navigatePage(-1) }}><NavigateBefore /></Button>
                    <Button disabled={ !pageMeta?.next} color="inherit" onClick={()=>{ navigatePage(1) }}><NavigateNext /></Button>
                </div>
            </section>

            {/* Add users modal */}
            <Modal showModal={addUserModal} toggleShowModal={toggleAddUserModal} backgroundTheme="dark" >
                <div className="loginContainer h-25">

                <Container maxWidth="xs" className="loginSubContainer">

                <Box sx={{ 
                    mt: 10, 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center"
                }}>
                
                <Avatar sx={{ 
                    m: 1,
                    bgcolor: "primary.light",
                    backgroundColor: "#ff8d41"
                }}>
                    <LockOutlined />
                </Avatar>

                <Typography variant="h5" sx={{ 
                    color: "white", 
                    textAlign: "center" 
                }}>
                מלא את הפרטים על מנת לקבל גישה לתוכנית
                </Typography>

                <Box sx={{ mt: 1}} component="form" onSubmit={ handleSubmit(submitNewUser) } >
                    <Typography variant="body1" sx={{ 
                        color: "white", 
                        textAlign: "right" 
                    }}>
                        :מייל
                    </Typography>

                    <TextField
                        {...register('email')}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        type="email"
                        name="email"
                        autoFocus
                        color="warning"
                        InputProps={{
                        style: {
                            color: "#ff8d41",
                        },
                        }}
                    />

                <Typography
                    variant="body1"
                    sx={{ color: "white", textAlign: "right" }}
                >
                :סיסמה לבחירה
                </Typography>
                <TextField
                    {...register('password')}
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="number"
                    color="warning"
                    InputProps={{
                    style: {
                        color: "#ff8d41",
                    }
                    }}
                    
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 5, backgroundColor:"#ff8d41" }}
                >
                    !קבל גישה עכשיו
                </Button>
                </Box>
            </Box>
          </Container>
        </div>
        </Modal>
        {/* End of add user Modal */}

        </section>
    )
}


export default Users;

