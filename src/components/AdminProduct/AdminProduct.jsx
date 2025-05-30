import React, { use, useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Drawer, Form, Modal, Space } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutation'
import * as message from '../../components/Messages/Messages'
import { useQuery } from "@tanstack/react-query";
import { useSelector } from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent'

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('')
    const [isOpenDrawer, setIsOpenDrawer] = useState(false)
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const user = useSelector((state) => state?.user)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [stateProduct, setStateProduct] = useState({
        name: '',
        type: '',
        price: '',
        countInStock: '',
        description: '',
        rating: '',
        image: '',
    })

    const [stateProductDetails, setStateProductDetails] = useState({
        name: '',
        type: '',
        price: '',
        countInStock: '',
        description: '',
        rating: '',
        image: '',
    })

    const [form] = Form.useForm()

    const mutation = useMutationHooks((data) => {
        const {        
            name,
            type,
            price,
            countInStock: countInStock,
            description,
            rating,
            image} = data
        const res = ProductService.createProduct({        
                name,
                type,
                price,
                countInStock,
                description,
                rating,
                image,
            })
            return res
        }
    )

    console.log('rowSelected', rowSelected)
    const mutationUpdate = useMutationHooks(
        (data) => {
            const { 
                id, 
                token, 
                ...rests } = data;
            const res = ProductService.updateProduct(
                id,
                token,
                {...rests},
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
            const res = ProductService.deleteProduct(
                id,
                token,
            );
        return res;
        },
    );
    const mutationDeletedMany = useMutationHooks(
        (data) => {
            const { 
                token, 
                ...ids
                } = data;
            const res = ProductService.deleteManyProduct(
                ids,
                token,
            );
        return res;
        },
    );

    const getAllProduct = async () =>{
        const res = await ProductService.getAllProduct()
        return res
    }


    const fetchProductDetails = async (rowSelected) => {
        try {
            const res = await ProductService.getDetailsProduct(rowSelected);
            console.log('Product Details Response:', res); // Debug API response
            if (res?.data) {
                setStateProductDetails({
                    name: res.data.name || '',
                    type: res.data.type || '',
                    price: res.data.price || '',
                    countInStock: res.data.countInStock || '',
                    description: res.data.description || '',
                    rating: res.data.rating || '',
                    image: res.data.image || '',
                });
            } else {
                console.error('No product details found');
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    useEffect(() => {
        form.setFieldsValue(stateProductDetails); // Cập nhật giá trị cho Form
    }, [form, stateProductDetails]);

    useEffect(() =>{
        if(rowSelected && isOpenDrawer) {
            fetchProductDetails(rowSelected)
        }
    }, [rowSelected,isOpenDrawer])

    const handleDetailProduct = () => {
        if (rowSelected) {
            fetchProductDetails(rowSelected); // Gọi hàm với rowSelected
        }
        setIsOpenDrawer(true);
    };

    const handleDeleteManyProduct = (ids) =>{
        mutationDeletedMany.mutate({ids: ids, token: user?.access_token}, {
            onSettled: () => {
                queryProduct.refetch(); // Refetch the product list after mutation
            }
        })
    }

    const {data, isLoading, isSuccess, isError} = mutation;
    const {data: dataUpdated, isLoading: isLoadingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated} = mutationUpdate;
    const {data: dataDeleted, isLoading: isLoadingDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted} = mutationDeleted;
    const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany} = mutationDeletedMany;    

    const queryProduct = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });
    const { isLoading: isLoadingProducts, data: products } = queryProduct
    const renderAction = () =>{
        return(
            <div> 
                <DeleteOutlined style={{color: 'red', fontSize: '20px', cursor: 'pointer'}} onClick={() => setIsModalOpenDelete(true)}/>
                <EditOutlined style={{color: 'red', fontSize: '20px', cursor: 'pointer'}} onClick={handleDetailProduct}/>
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
          title: 'Price',
          dataIndex: 'price',
          sorter: (a, b) => a.price - b.price,
          filters: [
            {
              text: '>= 50',
              value: '>=',
            },
            {
              text: '<= 50',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            if (value === '>=') {
                return record.price >= 50;
            } else if (value === '<=') {
                return record.price <= 50;
            }
            return false;
          },
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          sorter: (a, b) => a.rating - b.rating,
          filters: [
            {
              text: '>= 3',
              value: '>=',
            },
            {
              text: '<= 3',
              value: '<=',
            },
          ],
          onFilter: (value, record) => {
            if (value === '>=') {
                return record.rating >= 3;
            } else if (value === '<=') {
                return record.rating <= 3;
            }
            return false;
          },
        },
        {
          title: 'Type',
          dataIndex: 'type',
          ...getColumnSearchProps('type'),
        },
        {
          title: 'Action',
          dataIndex: 'action',
          render: renderAction
        },
    ];
    
    const dataTable = products?.data?.length && products?.data?.map((product) =>{
      return{
        ...product,
        key: product._id,
      }
    })


    useEffect(() =>{
        if(isSuccess && data?.status === 'OK') {
            message.success()
            handleCancel()
        }else if(isError) {
            message.error()
        }
    },[isSuccess])
    
    useEffect(() =>{
        if(isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success() 
        }else if(isErrorDeletedMany) {
            message.error()
        }
    },[isErrorDeletedMany])

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
        setStateProductDetails({
            name: '',
            type: '',
            price: '',
            countInStock: '',
            description: '',
            rating: '',
            image: '',
        })
        form.resetFields()
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    }

    const handleDeleteProduct = () =>{
        mutationDeleted.mutate({id: rowSelected,token: user?.access_token},{
            onSettled: () => {
                queryProduct.refetch(); // Refetch the product list after mutation
            }
        })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            type: '',
            price: '',
            countInStock: '',
            description: '',
            rating: '',
            image: '',
        })
        form.resetFields()
    };

    const onFinish = () => {
        mutation.mutate(stateProduct,{
            onSettled: () => {
                queryProduct.refetch(); // Refetch the product list after mutation
            }
        })
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        })
    }
    const handleOnchangeDetails = (e) => {
        setStateProductDetails({
            ...stateProductDetails,
            [e.target.name]: e.target.value,
        })
    }

    const handleOnchangeAvatar = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        })
    }
    const handleOnchangeAvatarDetails = async ({fileList}) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProductDetails,
            image: file.preview,
        })
    } 

    const onUpdateProduct = () => {
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            ...stateProductDetails,
            }, {
                onSettled: () => {
                    queryProduct.refetch(); // Refetch the product list after mutation
                }
            }
        );
    };
 
  return (
    <div>   
        <WrapperHeader>Manage Products</WrapperHeader>
        <div style={{
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
                }} onClick={() =>{
                    setIsModalOpen(true)
                }} ><PlusOutlined style={{
                        fontSize: '40px',
                        color: '#000',
                    }}/>
            </Button>
        </div>
        <div style={{
            marginTop: '20px',
        }}>
            <TableComponent handleDeleteMany={handleDeleteManyProduct} columns={columns} isLoading = {isLoadingProducts} data ={dataTable} 
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setRowSelected(record._id); // Đảm bảo rowSelected được cập nhật
                        }, 
                    };
                }}
            />
        </div>
        <ModalComponent forceRender title="Add Products" open={isModalOpen}  onCancel={handleCancel} footer={null} okText='' okButtonProps={{ style: { display: 'none' } }}>

                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}           
                    onFinish={onFinish}
                    autoComplete="on"
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name' }]}
                    >
                        <InputComponent values={stateProduct.name} onChange ={handleOnchange} name = "name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input product type' }]}
                    >
                        <InputComponent values={stateProduct.type} onChange ={handleOnchange} name = "type"/>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input product price' }]}
                    >
                        <InputComponent values={stateProduct.price} onChange ={handleOnchange} name = "price"/>
                    </Form.Item>
                    <Form.Item
                        label="Count in Stock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input product countInStock' }]}
                    >
                        <InputComponent values={stateProduct.countInStock} onChange ={handleOnchange} name = "countInStock"/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input product description' }]}
                    >
                        <InputComponent values={stateProduct.description} onChange ={handleOnchange} name = "description"/>
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input product rating' }]}
                    >
                        <InputComponent values={stateProduct.rating} onChange ={handleOnchange} name = "rating"/>
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input product image' }]}
                    > 
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                            <Button>Select File</Button>
                            {stateProduct?.image && (
                                <img
                                    src={stateProduct?.image}
                                    alt="product image"
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
                    </Form.Item>


                    <Form.Item label={null} wrapperCol={{ span: 16, offset: 20 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

        </ModalComponent>
        <Drawer forceRender title = 'Product' open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)} width= "90%">
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    style={{ maxWidth: 600 }}           
                    onFinish={onUpdateProduct}
                    autoComplete="on"
                    form={form}
                    initialValues={stateProductDetails}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name' }]}
                    >
                        <InputComponent values={stateProductDetails.name} onChange ={handleOnchangeDetails} name = "name" />
                    </Form.Item>

                    <Form.Item
                        label="Type"
                        name="type"
                        rules={[{ required: true, message: 'Please input product type' }]}
                    >
                        <InputComponent values={stateProductDetails.type} onChange ={handleOnchangeDetails} name = "type"/>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input product price' }]}
                    >
                        <InputComponent values={stateProductDetails.price} onChange ={handleOnchangeDetails} name = "price"/>
                    </Form.Item>
                    <Form.Item
                        label="Count in Stock"
                        name="countInStock"
                        rules={[{ required: true, message: 'Please input product countInStock' }]}
                    >
                        <InputComponent values={stateProductDetails.countInStock} onChange ={handleOnchangeDetails} name = "countInStock"/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input product description' }]}
                    >
                        <InputComponent values={stateProductDetails.description} onChange ={handleOnchangeDetails} name = "description"/>
                    </Form.Item>
                    <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[{ required: true, message: 'Please input product rating' }]}
                    >
                        <InputComponent values={stateProductDetails.rating} onChange ={handleOnchangeDetails} name = "rating"/>
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[{ required: true, message: 'Please input product image' }]}
                    > 
                        <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
                            <Button>Select File</Button>
                            {stateProductDetails?.image && (
                                <img
                                    src={stateProductDetails?.image}
                                    alt="product image"
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
                    </Form.Item>
                    <Form.Item label={null} wrapperCol={{ span: 16, offset: 20 }}>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form.Item>
                </Form>
        </Drawer> 

        <ModalComponent 
            title="Delete Products" 
            open={isModalOpenDelete}  
            onCancel={handleCancelDelete} 
            onOk ={handleDeleteProduct} 
            okText="Delete"    
            okButtonProps={{ type: 'primary', danger: true }} 
        >
            <div>Are you want to delete this product?</div>
        </ModalComponent>
    </div>
  )
}

export default AdminProduct