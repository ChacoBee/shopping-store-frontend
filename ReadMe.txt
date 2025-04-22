App cần install cho project
Ant Design: FOR UI
Redux Toolkit

DÙNG ANT DESIGN CHO DESIGN

tạo 1 folder redux trong src

tạo 1 folder slides trong redux -> tạo counterSlide.cs

tiếp theo sử dụng styled-components npm
tạo folder hooks trong src
tạo folder components trong src
tạo folder pages trong src


styled-components dùng để điều chỉnh css
install react router v6
Tạo HomePage, OrderPage, ProductPage -> vô App.js

tạo folder routes -> tạo file index.js để pastes tất cả các path vô trong đó(thuận tiên hơn để làm web)

tiếp theo, tạo 1 style cho Header, tạo 1 WrapperHeader rồi gán nó vào Header

input search text lấy trong ant Design
search icon trong ant design cho phần login/logout
Dùng gutter trong WrapperHeader để cách các components

tạo 1 cái button input search cho header
tạo 1 cái props trong button intput search để chỉnh sửa thông tin linh động hơn trong từng page

#5
tạo 1 cái InputComponent để thay thế tag Input trong BUttonInputSearch(để sau này có thể sử dụng InputComponent ở nhiều nơi khác)
tạo ButtonComponent như InputComponent
Tạo productType folder trong components (Prodcut Type sẽ nằm trong HomePage)
Tạo 1 mảng array cho productType trong HomePage -> dùng .map để list các item trong array vô ProductType
tạo style.js trong folder HomePage (tao Wrapper để wrap cái product type lại)

#6 tạo image slide show vs react-slick
tạo 1 array cho ảnh slider

import {
        @import "slick-carousel/slick/slick.css";
        @import "slick-carousel/slick/slick-theme.css";
        }
        trong file index.css
tạo file SilderComponent.jsx r lấy doc trên https://react-slick.neostack.com/docs/get-started về để tạo slide(thêm thuộc tính nếu thích)

add thêm gap: 16px; flex-wrap: nowrap; vào trong file style.js của thằng Header.jsx
add white-space: nowrap; vào phần WrapperTextHeaderSmall trong file style.js của thằng Header.jsx
fix phần SliderComponent trong HomePage, đặt nó ra 1 cái div riêng để chỉnh padding đẹp hơn (nằm ngoài cái div cũ) 
    -> bọc 2 cái div trong cùng 1 cái fragment <></>

#7
tạo ra CardComponent
vô Ant design tìm 1 cái card design https://ant.design/components/card
bỏ CardComponent vô homePage ngay dưới SliderComponent
tạo style.js cho CardComponent (style.js này đúng để build tùng dòng trong cái CardComponent, vd như tên product, giá)
phân chia các phần trong CardComponent để css trong style.js
tải logo official về tại https://salt.tikicdn.com/ts/upload/5d/4c/f7/0261315e75127c2ff73efd7a1f1ffdf2.png

#8 Tạo phần Navbar
tạo NavbarComponent
swich-case trong NavbarComponent để chia phần ra cho phần navbar (navbar sẽ nằm bên trái)
các phần của Navbar:
        1. label

add NavbarComponent vô HomePage


#9
gắn cái ButtonComponent vô HomePage, add css cho nó => r qua file style.js của tahng82 HomePage để export const WrapperButtonMore
chỉnh 1 số thuộc tính của div CardComponent trong HomePage, bỏ gap đi thay bằng justfityContent: 'space-', + thêm flexWrap: 'wrap' để wrap 
các thể CardComponent xuống dòng
=> tạo 1 path: '/:type' trong index.js của routes folder
tạo 1 TypeProductPage trong pages

#10
Edit lại các style trong TypeProductPage (tạo style.js cho TypeProductPage)

Vô Header tạo <Badge> wrap cái tag ShoppingCartOutlined lại
tao signin/signup/productdetails page trong thằng pages => thêm 3 paths cho từng page trong phần index.js của routes luôn
bắt đầu xây dựng backend
kiếm Pagination trong ant design add vô TypeProductPage

#11
Tạo ProductDetailsComponent trong component và style nó
#12 tiếp tục #11
hoàn tiện phần product details(bao gồm ảnh + details + delivery + buttons)

#13
Login and Signup page
tạo ra component inputForm cho signin/signup
ở inputForm sẽ tạo ra props để trữ placeholder
const {valueInput, setValueInput} = useState('') trong inputForm
trong react, tạo props khi muốn truyền dữ liệu từ parent component xuống child component
sử dụng useState Khi dữ liệu thay đổi và ảnh hưởng đến giao diện, Khi cần theo dõi dữ liệu từ form nhập liệu, Khi cần theo dõi danh sách hoặc mảng dữ liệu
sự khác nhau: props(truyền dữ liệu từ parent component xuống child component) useState(lưu trữ và cập nhật dữ liệu trong component)

#14
điều chỉnh lại css

#15 bắt đầu làm phần backend
npm init
npm i express dotenv bcrypt jsonwe
btoken body-parser cors 
npm  i mongoose

#16 backend 
(LÀM MỌI THỨ TRONG BACKEND BẮT BUỘC PHẢI LOGIN VÔ ADMIN ACCOUNT ĐỂ CÓ ACCESS token)
set up cho models folder(OrderProduct, ProductModel, UserModel)
vô mongodb -> build database -> cluster -> tạo tài khoản trong quickstart -> cluster -> connect your application -< copy đường link ->
-> vào index.js -> cập nhật env file 
chuyển đường link trong index.js từ 'mongodb+srv://bi3996:<db_password>@cluster0.bhk9n4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' 
thành `mongodb+srv://bi3996:${process.env.MONGO_DB}@cluster0.bhk9n4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

#17 backend
tạo idnex.js trong routes

#18 API cho đăng ký người dùng (backend)
#19 API đăng nhập kết hợp jsonwebtoken ở backend
#20 Tạo API cập nhật thông tin người dùng
#21 Tạo API xóa và lấy thông tin người dùng ở backend
#22 Cấp token mới khi access_token hết hạn (bằng refresh_token)
------
#23 Viết API CRUD cho product
#24 Paginated ở phía backend
#25 Sort và filter cho product
------

(front-end)
#26 Tích hợp react query vào dự án
npm i axios dotenv bên front end
tạo file .env
vô App.js để fetchAPI
đi lấy react-query: https://www.npmjs.com/package/react-query
tải cái <QueryClientProvider client={queryClient}> trong quickstart của tankstack dục vô index.js
tiếp theo là tích hợp devtools vào index.js
const query = useQuery({ queryKey: ['todos'], queryFn: getTodos }) để thử call api trong app.js

#27 Xử lý state đăng nhập, đăng ký
tạo cái useNavigation để kết nối các page signin/signup lại với nhau
validate signin/signup theo API
tiếp theo là điểu chỉnh cái email.password.confimr password của cả thằng signin và signup 
tạo những       const [email, setEmail] = useState('');
                const [passWord, setPassword] = useState('');
                const [confirmPassword, setConfirmPassword] = useState('');
  để set các giá trị cho inputForm -> thêm cái onChange cho từng input text
  ví dụ inputForm cho email 
        value={email} 
        onChange ={handleOnchangeEmail}     
điều chỉnh style 1 chút cho ButtonComponent: button chỉ hiện màu cam khi mà có text trong 2 ô input, k thỳ hiện mà xám: 
dùng background: disabled ? '#ccc' : styleButton.background - nhớ thêm disabled vào torng const ButtonComponent{.....} 
style này sẽ áp dụng cho button bên sign up page luôn 

#28 Custom useMutation để gọi API
tạo folder service trong src để call các function để gọi api
vô tanstack mục mutations lấy const muatations để dán vào signin page
xong r chuyền cái mutation vô handleSignin(vẫn ổ trong signinPage)
--- tạo 1 file useMutation trong hooks(để sau này hooks dễ hơn cho các function api khác)
trong SigninPage, gọi   
const mutation = useMutationHooks(
    data => UserService.loginUser(data)
);
tới UserSerice bên frontend để kéo thông tin từ backend qua: const res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/user/sign-in`, data);
*BẮT BUỘC NHỚ: API KEY LÀ REACT_APP_BACKEND_API_URL TRONG .env: TÁC DỤNG SẸ GỌI THẲNG TỞI ĐƯỜNG LINK API
sau khi tạo ra biến mutation : nhớ gắ mutation.mutate({ email, password }) vào tronv handleSignin và handleSignup

#29 Xử lý thông tin user sau khi đăng nhập
tạo folder Messages để hiển thị tin nhắn khi signin/signup -> qua bên back end chỉnh sửa lại ERROR thành ERR, và vô UserController để điểu chỉnh
s cho chỉ access_token hiện lên khi signin thành công
const {refresh_token, ...newResponse} = response -> they newResponse vô return res.status(200).json(newResponse)
lấy HttpOnly: true và Secure: true để lấy refresh_token bên cookies sau khi đăng nhập thành công
tiếp theo :npm install cookie-parser bên backend -> cần điểu chỉnh lại trong index.js thêm app.use(cookieParser())
và trong UserController đổi thành const token = req.cookies.refresh_token của phần signIn

npm i jwt-decode trong backend

cách lấy details ng dùng router là /user/get-details/${id}, tạo ra 1 đường dẫn API mới trong UserSerice
bên backend vô authMiddleWare xoá payload = user đi, gán thẳng user vô luôn
bên frontend, torng thằng signIn, cần phải lấy cái thằng access_token
để cho URL nhận biết dc Beare access_token là gì để lấy thông tin ng dùng, xem video tầm ở khoảng thời gian 3/4 video
tạo userSlice trong redux
import {useDispatch} from 'react-redux' trong signin
trong userSlice, update cái updateUser và gắn nó vào dispatch displatch(updateUser({...res?.data, access_token: token})); trong handleGetDetailUser của signin
khi sign in thành công, cần update thông tin ng dùng lên homepage và đổi chữ signin/signup thành name của user:
-> vô headercomponent gắn thằng này vào const user = useSelector((state) => state.user)

r chuyển cái <div onClick={handleNavigationLogin} style={{cursor: 'pointer'}} > vô trong  
        {user?.name ? (
                <div>{user.name}</div>
        ) : ( 
                #ở đẩy 
        )}

#30 Xử lý token hết hạn ở phía UI
tạo ra utils.js trong src
chủ yếu là xử lý trong thằng App.js để mỗi khi refresh web thỳ vẫn login tài khoản
tiếp theo, lên intercepter axios để copy đoạn code của nó về gắn vô App.js
vô userService tạo 1 handle API mới cho refresh_token
căn bản là xử lý khi thagn82 access_token hết hạn, thỳ nó sẽ tự gọi về backend vs refresh_token để lấy thằng access_token mới

#31 Thực hiện chức năng logout
vào backend tạo 1 đường api mới trong UserRouter (logout)
qua frontend tạo 1 thằng logoutUser trong UserSerice
lên antd lấy thằng popover về điều chỉnh trong Header => qua userSlice tạo 1 thằng resetUser

#32 Thực hiện chức năng profile
tạo 1 page cho profielPage

#34 Hoàn thiện chức năng profile
chỉnh phần avatar trong user info(lưu ảnh về phía backend) -> vô ant design kiếm upload component
điều chỉnh thằng handleOnchangeAvatar trong profilePage(frontend) vô utils.js export 1 thằng getBase64 r dục n1o vô handleOnchangeAvatar
dùng đoạn code này dán vô index.js của backend để sữa lỗi khi upload ảnh mới:
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
-> cách để thay đổi ava cảu mình thành ảnh mới upload:
vô Header: thêm user?.avatar trong useEffect 
tạo useState cho userAvatar
r kéo xuống kiếm thằng UserOutlined để tạo 1 cái diều kiện, nếu có userAvatar thỳ sẽ hiện ra ảnh upload
k thỳ thôi

#35 Thực hiện tính năng phân quyền trang admin
tạo ProductSetvice trong folder services


#36 Dựng khung cho trang admin
AdminPage.js -> khi đăng nhập bằng tài khoản admin thỳ sẽ thêm 1 mục lục là quản lý hệ thống -> vô Header -> xây dưng AdminPage
vô ant design lấy thằng navigation -> export funtion getItem torng utils.js

#37 Xây dựng UI cho trang admin
tạo ra AdminUser và AdminProduct trong components
renderPage trong AdminPage dùng switch case để khi nào ấn vô option nào thỳ sẽ hiện ra trang tương ứng, dưới phần body thêm {renderPage(keySelected)}

bắt đầu UI cho AdminUser
        Đầu tiên là h1
        Sau đó tạo button(Lấy của ant design) : chỉnh CSS cho đẹp hơn   
        Sau đó tạo 1 table(lấy từ ant design): tạo table component folder