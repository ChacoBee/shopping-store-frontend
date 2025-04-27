import React, { useEffect, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import TableComponent from '../TableComponent/TableComponent'
import InputComponent from '../InputComponent/InputComponent'
import { getBase64 } from '../../utils'
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from '../../hooks/useMutation'
import * as message from '../../components/Messages/Messages'
import { useQuery } from "@tanstack/react-query";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
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

    const getAllProduct = async () =>{
        const res = await ProductService.getAllProduct()
        console.log('res', res)
        return res
    }

    const {data, isLoading, isSuccess, isError} = mutation;

    const { isLoading: isLoadingProducts, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProduct,
    });

    const renderAction = () =>{
        return(
            <div> 
                <DeleteOutlined style={{color: 'red', fontSize: '20px', cursor: 'pointer'}}/>
                <EditOutlined style={{color: 'red', fontSize: '20px', cursor: 'pointer'}}/>
            </div>
        )
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
        },
        {
          title: 'Type',
          dataIndex: 'type',
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
        mutation.mutate(stateProduct)
        console.log('Success:', stateProduct);
    }

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
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
            <TableComponent columns={columns} isLoading = {isLoadingProducts} data ={dataTable} />
        </div>
        <Modal title="Add Products" open={isModalOpen}  onCancel={handleCancel} footer={null} okText='' okButtonProps={{ style: { display: 'none' } }}>
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
        </Modal>
    </div>
  )
}

export default AdminProduct