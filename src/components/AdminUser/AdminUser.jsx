import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Drawer, Form, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { WrapperUploadFile } from '../AdminUser/style'
import ModalComponent from '../ModalComponent/ModalComponent'
import { getBase64 } from '../../utils'
import * as message from '../../components/Messages/Messages'
import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutation'
import { useQuery } from "@tanstack/react-query";
import * as UserService from '../../services/UserService'


const AdminUser = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [stateUser, setStateUser] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    })

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
    })

    const [form] = Form.useForm()


    console.log('rowSelected', rowSelected)
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { 
                id, 
                token, 
                ...rests } = data;
            const res = UserService.updateUser(
                id,
                {...rests},
                token,
            );
        return res;
        },
    );

    const mutationDeleted = useMutationHooks(
        (data) => {
            const { 
                id, 
                token, 
                } = data;
            const res = UserService.deleteUser(
                id,
                token,
            );
        return res;
        },
    );

    const getAllUser = async () =>{
        const res = await UserService.getAllUser()
        console.log('res', res)
        return res
    }


    const fetchUserDetails = async (rowSelected) => {
        try {
            const res = await UserService.getDetailUser(rowSelected);
            console.log('User Details Response:', res); // Debug API response
            if (res?.data) {
                setStateUserDetails({
                    name: res.data.name || '',
                    email: res.data.email || '',
                    phone: res.data.phone || '',
                    isAdmin: res.data.isAdmin || '',
                });
            } else {
                console.error('No user details found');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails); // Cập nhật giá trị cho Form
    }, [form, stateUserDetails]);

    useEffect(() =>{
        if(rowSelected){
            fetchUserDetails(rowSelected)
        }
    }, [rowSelected])

    const handleDetailUser = () => {
        if (rowSelected) {
            fetchUserDetails(rowSelected); // Gọi hàm với rowSelected
        }
        setIsOpenDrawer(true);
    };


    const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate;
    const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDeleted;

    const queryUser = useQuery({
        queryKey: ['user'],
        queryFn: getAllUser,
    });
    const { isLoading: isLoadingUsers, data: users } = queryUser
    const renderAction = () =>{
        return(
            <div> 
                <DeleteOutlined style={{color: 'red', fontSize: '20px', cursor: 'pointer'}} onClick={() => setIsModalOpenDelete(true)}/>
                <EditOutlined style={{color: 'red', fontSize: '20px', cursor: 'pointer'}} onClick={handleDetailUser}/>
            </div>
        )
    }

    const handleSearch = (
        selectedKeys,
        confirm,
        dataIndex,
      ) => {
        confirm();
        // setSearchText(selectedKeys[0]);
        // setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters) => {
        clearFilters();
        // setSearchText('');
      };


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
            <InputComponent
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{ width: 90 }}
              >
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes((value).toLowerCase()),
        filterDropdownProps: {
          onOpenChange(open) {
            if (open) {
              setTimeout(() => searchInput.current?.select(), 100);
            }
          },
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     // <Highlighter
        //     //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     //   searchWords={[searchText]}
        //     //   autoEscape
        //     //   textToHighlight={text ? text.toString() : ''}
        //     // />
        //   ) : (
        //     text
        //   ),
      });

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
          sorter: (a, b) => a.name.length - b.name.length,
          ...getColumnSearchProps('name')
        },
        {
          title: 'Email',
          dataIndex: 'email',
          render: (text) => <a>{text}</a>,
          sorter: (a, b) => a.email.length - b.email.length,
          ...getColumnSearchProps('email')
        },
        {
          title: 'Admin',
          dataIndex: 'isAdmin',
          filters: [
            {
              text: 'True',
              value: 'true',
            },
            {
              text: 'False',
              value: 'false',
            },
          ],
          onFilter: (value, record) =>{
            if(value === 'true'){
                return record.isAdmin === 'True'
            }else{
                return record.isAdmin === 'False'
            }
          }
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          render: (text) => <a>{text}</a>,
          sorter: (a, b) => a.phone.length - b.phone.length,
          ...getColumnSearchProps('phone')
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        }
    ];
    
    const dataTable = users?.data?.length && users?.data?.map((user) =>{
      return{
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? 'True' : 'False',
      }
    })


    // useEffect(() =>{
    //     if(isSuccess && data?.status === 'OK') {
    //         message.success()
    //         handleCancel()
    //     }else if(isError) {
    //         message.error()
    //     }
    // },[isSuccess])

    useEffect(() =>{
        if(isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success()
            handleCancelDelete()
        }else if(isErrorDeleted) {
            message.error()
        }
    },[isSuccessDeleted])

    useEffect(() =>{
        if(isSuccessUpdated && dataUpdated?.status === 'OK') {
            message.success()
            handleCloseDrawer()
        }else if(isErrorUpdated) {
            message.error()
        }
    },[isSuccessUpdated])
    
    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        })
        form.resetFields()
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteUser = () =>{
        mutationDeleted.mutate({id: rowSelected,token: user?.access_token},{
            onSettled: () => {
                queryUser.refetch(); // Refetch the user list after mutation
            }
        })
    }

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setStateUser({
    //         name: '',
    //         email: '',
    //         phone: '',
    //         isAdmin: false,
    //     })
    //     form.resetFields()
    // };


    // const handleOnchange = (e) => {
    //     setStateUser({
    //         ...stateUser,
    //         [e.target.name]: e.target.value,
    //     })
    // }
    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        })
    }

    // const handleOnchangeAvatar = async ({fileList}) => {
    //     const file = fileList[0]
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setStateUser({
    //         ...stateUser,
    //         image: file.preview,
    //     })
    // }
    // const handleOnchangeAvatarDetails = async ({fileList}) => {
    //     const file = fileList[0]
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setStateUser({
    //         ...stateUserDetails,
    //         image: file.preview,
    //     })
    // } 

    const onUpdateUser = () => {
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            ...stateUserDetails,
            }, {
                onSettled: () => {
                    queryUser.refetch(); // Refetch the user list after mutation
                }
            }
        );
    };
  return (
    <div>   
        <WrapperHeader>Manage Users</WrapperHeader>
        {/* <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '15px',
                marginBottom: '15px',
            }}>
            <Button style={{
                    height: '150px',
                    width: '150px',
                    borderRadius: '10px',
                    borderStyle: 'dashed',
                }}><PlusOutlined style={{
                        fontSize: '40px',
                        color: '#000',
                    }}/>
            </Button>
        </div> */}
        <div style={{
            marginTop: '20px',
        }}>
            <TableComponent columns={columns} isLoading = {isLoadingUsers} data ={dataTable} 
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setRowSelected(record._id); // Đảm bảo rowSelected được cập nhật
                        }, 
                    };
                }}
            />
        </div>

        <Drawer forceRender title = 'User Details' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= "90%">
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}           
                    onFinish={onUpdateUser}
                    autoComplete="on"
                    form={form}
                    initialValues={stateUserDetails}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input user name' }]}
                    >
                        <InputComponent values={stateUserDetails.name} onChange ={handleOnchangeDetails} name = "name" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input user email' }]}
                    >
                        <InputComponent values={stateUserDetails.email} onChange ={handleOnchangeDetails} name = "email"/>
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[{ required: true, message: 'Please input user phone' }]}
                    >
                        <InputComponent values={stateUserDetails.phone} onChange ={handleOnchangeDetails} name = "phone"/>
                    </Form.Item>
{/* 
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input user image' }]}
                    > 
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button>Select File</Button>
                            {stateUserDetails?.image && (
                                <img
                                    src={stateUserDetails?.image}
                                    alt="user image"
                                    style={{ 
                                        width: '60px', 
                                        height: '60px', 
                                        borderRadius: '50%', 
                                        marginTop: '10px', 
                                        objectFit: 'cover',
                                        marginLeft: '10px', 
                                    }}
                                />
                            )}
                        </WrapperUploadFile>
                    </Form.Item> */}
                    <Form.Item label={null} wrapperCol={{ span: 16, offset: 20 }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
        </Drawer> 

        <ModalComponent
            title="Delete User" 
            open={isModalOpenDelete}  
            onCancel={handleCancelDelete} 
            onOk ={handleDeleteUser} 
            okText="Delete"    
            okButtonProps={{ type: 'primary', danger: true }} 
        >
            <div>Are you want to delete this user?</div>
        </ModalComponent>
    </div>
  )
}

export default AdminUser