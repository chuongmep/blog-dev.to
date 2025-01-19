
## Tổng quan

Để nối tiếp bài viết về macOS, hôm nay mình sẽ thử cài đặt [Tensorflow](https://www.tensorflow.org/overview) trên máy Mac book sử dụng chip M1 để xem có gặp lỗi gì không. Điều này cũng đã được cảnh báo rất nhiều lần ở những blog khác, nhưng mình vẫn muốn thử xem sao.

Tensorflow là thư viện mã nguồn mở mạnh mẽ giúp bạn nhanh chóng build các mô hình máy học, tập trung vào đào tạo và suy luận các mạng nơ-ron sâu (deep neural network). Thư viện này trước đây mình cũng không thích dùng lắm đa số sử dụng pytorch, nhưng tensorflow cũng có những ưu điểm riêng của nó, nên bạn cũng nên thử xem sao.

## Cài đặt

Việc cài đặt rất dễ dàng, việc đầu tiên bạn cần làm đó chính là cài đặt **miniconda**. Lý do sử dụng **miniconda** ở đây là mình đã thử trên môi trường chính nhưng không thể tìm thấy gói nào để cài đặt Tensorflow. 

![](pic/iShot_2022-12-22_00.14.07.png)

Để cài đặt **miniconda** bạn có thể tham khảo bài viết ở [đây](https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html). Việc cài đặt là đơn giản.

Nhưng hãy dừng lại, Apple đã có trang hướng dẫn và tệp cài bash chính xác hơn cho Apple M1, vì vậy bây giờ bạn hãy theo dõi liên kết này để cài đặt **miniconda**:

![](pic/iShot_2022-12-21_23.37.50.png)

Tiếp theo là bạn thực thi một bash đơn giản là gọi tệp **miniconda** lên để thực thi. Lưu ý đôi khi việc tải về có thể khiến tên tệp tải của bạn bị thay đổi, vì vậy bạn cần phải thay đổi tên tệp tải về thành **miniconda.sh** trước khi chạy lệnh thực thi bên dưới. Lưu ý, để thực tệp, bạn cần đi dến thư mục chứa tệp **miniconda.sh** trước sau đó mới bắt đầu thực thi một `bash`.

```bash
bash miniconda.sh
```
![](pic/iShot_2022-12-21_23.41.36.png)

Sau khi đồng ý những quy định, **miniconda** sẽ tạo ra một thư mục chứa các gói cần thiết mà bạn cần, việc của bạn bây giờ là hãy ghi nhớ đường dẫn này.

![](pic/iShot_2022-12-21_23.43.10.png)

Việc tiếp theo của bạn chỉ cần chọn `y` để tiếp tục khởi tạo môi trường trên máy.

![](pic/iShot_2022-12-21_23.46.04.png)

Khởi tạo hoàn tất, hãy nhanh chóng ghi nhớ đường dẫn của bạn, bạn sẽ cần nó trong bước tiếp theo, sẽ là đường dẫn `opt/miniconda3/`.

Và lúc này hãy nhanh chóng cài đặt `tensorflow-deps` bằng lệnh sau:

```bash
conda install -c apple tensorflow-deps
```
![](pic/iShot_2022-12-21_23.52.40.png)

Rõ ràng chúng ta thấy numpy đã bị phụ thuộc, mình sẽ tiếp tục nói ở phần sau để bạn hiểu được tính phụ thuộc này. Việc của bạn để hoàn tất bây giờ là rất đơn giản, sử dụng lệnh sau để cài đặt tensorflow:

```bash
python -m pip install tensorflow-macos
python -m pip install tensorflow-metal
```

![](pic/iShot_2022-12-21_23.56.20.png)

Sau khi cài đặt xong, bạn có thể nhanh chóng kiểm tra với Jupyter Notebook và lựu chọn đúng môi trường bạn đã khởi tạo với **miniconda**.

![](pic/iShot_2022-12-22_07.11.29.png)

Thử kiểm tra với tensorflow:

```py
import tensorflow as tf
print(tf.__version__)
```

Thật xui xẻo là bạn sẽ gặp lỗi này ở thời điểm mình viết bài này, lý do ở đây chính là việc xung đột giữa tensorflow và numpy, gói phụ thuộc numpy lúc này cần được nâng cấp hoặc hạ thấp phiên bản.

![](pic/iShot_2022-12-21_23.10.34.png)

Và giờ bạn hãy tiến hành thêm một bước hạ thấp phiên bản của `numpy` xuống để khắc phục lỗi này, đây là một lỗi đã được hỏi tại [StackOverflow](https://stackoverflow.com/questions/72043662/typeerror-unable-to-convert-function-return-value-to-a-python-type-the-signatu) và mình đã thử và thành công.

```bash
pip install numpy==1.21.6
```
Bây giờ hãy thử lại, một kết quả nhập gần `32` giây. Kết quả có vẻ tồi hơn những gì mình mong đợi.

![](pic/iShot_2022-12-21_23.17.17.png)

Và sau khi khởi động lại **Visual Studio Code**, chạy lại **Jupyter NoteBook**, kết quả thay đổi sang  `3.7` giây.

![](pic/iShot_2022-12-22_07.08.17.png)

Bây giờ bạn có thể nhanh chóng kiểm tra nhanh xem liệu gói tensorflow của các bạn co được sử dụng tài nguyên gpu hay không bằng việc sử dòng mã sau:

```py
# test if GPU is available
devices = tf.config.list_physical_devices('GPU')
print(devices)
# show details of GPU
tf.test.gpu_device_name()
```
Kết quả như mong đợi, tensorflow của bạn đã sử dụng được tài nguyên GPU.

![](pic/iShot_2022-12-21_23.20.25.png)

Sẵn tiện để thử xem liệu tensorflow của bạn có hoạt động bình thường không, hãy thử tạo nhanh một tensor và thực hiện tính toán đơn giản trên nó.

```py
# try to use GPU
import tensorflow as tf
with tf.device('/GPU:0'):
    a = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[2, 3], name='a')
    b = tf.constant([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], shape=[3, 2], name='b')
    c = tf.matmul(a, b)
    print(c)
```

Kết quả như mong đợi, bạn đã có thể sử dụng được tensorflow trên máy tính của mình.

![](pic/iShot_2022-12-21_23.24.06.png)

Bây giờ, hãy thử với một train, test đơn giản xem thế nào. Cơ sở dữ liệu MNIST là một cơ sở dữ liệu lớn chứa các chữ số viết tay thường được dùng trong việc huấn luyện các hệ thống xử lý hình ảnh khác nhau, đây là cơ sở dữ liệu cực kỳ phổ biến và bạn có thể nhanh chóng thử nghiệm qua thư viện tensorflow. 

```py
import tensorflow as tf
mnist = tf.keras.datasets.mnist
(x_train, y_train),(x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test, y_test)

```

Kết quả chúng ta lại có thêm lỗi mới.

![](pic/iShot_2022-12-22_00.27.49.png)

Và lỗi lần này lại chính là việc sai sót phiên bản trong xung đột. Để khắc phục lỗi này, bạn hãy thử cài đặt lại `tensorflow` ứng với số phiên bản tương thích bằng cách sử dụng lệnh sau bên trong `Jupyter notebook` thật không thể tin được là mình lại may mắn khi tìm được chủ đề có người nhận lỗi tương tự ở [Apple Developer:](https://developer.apple.com/forums/thread/721619)

```py
!pip install tensorflow-macos==2.9
!pip install tensorflow-metal==0.5.0
```
Thời gian cho `5 epochs` là `1 phút 12 giây`, tốc độ huấn luyện cũng khá nhanh với công sức bỏ ra phải không nào. Nếu bạn đang sử dụng máy Window thì hãy thử xem thời gian trên máy bạn là bao nhiêu ?

![](pic/iShot_2022-12-22_00.34.44.png)

Cũng như ví dụ trên, chúng ta hãy thử tạo một máy ảo `linux ARM64` với parallels desktop và cài đặt `tensorflow` trên máy ảo này. Đây là thông tin về máy ảo mà mình đã thiêt lập để phù hợp với dung lượng của máy.

![](pic/iShot_2022-12-24_16.24.44.png)

Kết quả sử dụng CPU để huấn luyện mô hình và cho ra kết quả bất ngờ là `26.8 giây`, một con số khủng khiếp. Vì Linux chạy trên máy ảo và đang sử dụng CPU chứ không phải GPU. 

![](pic/iShot_2022-12-24_15.41.03.png)

Đối với kết quả như vậy, chúng ta hãy thử quay lại **MacOS** và thực hiện huấn luyện rõ ràng trên `CPU` và `GPU` thử xem kết quả có thay đổi gì không, vì rõ ràng chúng ta đang so sánh kết quả giữa việc chạy thông thường trên Mac so với một kết quả sử dụng CPU `linux ARM64`.

Hãy thử xem lại danh sách của Macos có đang hiển thị kết quả của cả CPU và GPU không. Kết quả cho thấy danh sách của cả hai.

![](pic/iShot_2022-12-24_15.48.26.png)

Được rồi, bây giờ mình sẽ thử lại với thiết lập tùy chỉnh `CPU` xem kết quả có thay đổi không. Hãy thay đổi một chút để tắt GPU và chỉ sử dụng CPU để huấn luyện mô hình.

```py
import tensorflow as tf
DISABLE_GPU = True
if DISABLE_GPU:
    try:
        # Disable all GPUS
        physical_devices = tf.config.list_physical_devices('GPU')
        tf.config.set_visible_devices(physical_devices[1:], 'GPU')
        visible_devices = tf.config.get_visible_devices()
        print(visible_devices)
        for device in visible_devices:
            assert device.device_type != 'GPU'
    except:
        print('Invalid device or cannot modify virtual devices once initialized.')
        pass
mnist = tf.keras.datasets.mnist
(x_train, y_train),(x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0
model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test, y_test)
# save model
model.save('mnist_model.h5')
# try to load model
new_model = tf.keras.models.load_model('mnist_model.h5')
new_model.summary()
# try to predict
predictions = new_model.predict(x_test)
print(predictions[0])
```
Kết quả mất `58.3` giây để hoàn tất, rõ ràng là kết quả đã thay đổi. Nhưng tổng thể thời gian vẫn là không thể so sánh với máy ảo `Linux`.

Để mình thử so sánh với cấu hình PC mình đang làm với `i9-12900KF 128GB Ram Card RTX 3080Ti 1TB SSD` xem thế nào. Kết quả cho thấy việc nhập thư viện `tensorflow` mất `2.5 giây` và việc huấn luyện mô hình mnist mất `34.5` giây. Tất nhiên khoảng cách giữa hai máy là quá xa và chỉ là môt một bài test nhỏ chứ không phải so sánh hơn thua. Và như vậy, rõ ràng Linux chính là kẻ đã thắng cuộc trong màn so kèo này. [Asahi Linux](https://github.com/AsahiLinux) chính xác sẽ là kẻ làm thay đổi cuộc chơi với Linux trên Apple M1.

![](pic/Code_bcbgxfjuaG.png)

## Kết luận

Rõ ràng, với các kết quả trên, có vẻ tensorflow cho apple M1 vẫn chưa được tối ưu, đáng ra kết quả phải khác hơn nhiều, các kỹ sư học máy nếu muốn sử dụng M1 Max ngay lúc này hãy cân nhắc vì khả năng tương thích là chưa ổn ở thời điểm này. Có rất nhiều bài viết đã nói về việc này. Đó là lý do bạn hãy tạm thời ngừng xem các video trên youtube marketing và xem các bài viết thực tế như này để nhận thức rõ ràng hơn. Hãy xem [Performance issue on Macbook Pro M1](https://developer.apple.com/forums/thread/686098) hay bài viết [M1 GPU is extremely slow, how can I enable CPU to train my NNs?](https://developer.apple.com/forums/thread/693678) đó là của một năm trước và một nmă sau vẫn như vậy. Điều cuối cùng đáng thất vọng hơn là kho github đã chuyển sang lưu trữ với vấn đề [https://github.com/apple/tensorflow_macos/issues/12](https://github.com/apple/tensorflow_macos/issues/12) vẫn là một ẩn số. Hãy tích cực đặt câu hỏi và theo dõi ở [tensorflow on M1 MacBook Pro](https://www.reddit.com/r/MachineLearning/comments/u8gzvg/d_tensorflow_on_m1_macbook_pro/)

Sau đó mình đã xem xét qua bài này có vẻ mô hình kết hợp giữa chip và phần mềm có rất nhiều điều để xem xét ở các bài viết sau này [Here’s why Apple believes it’s an AI leader—and why it says critics have it all wrong](https://arstechnica.com/gadgets/2020/08/apple-explains-how-it-uses-machine-learning-across-ios-and-soon-macos/)

Các vấn đề về hiệu suất trên tensorflow trên M1 Max có thể được xem xét ở [Performance issues tensorflow- M1 apple silicon chip](https://stackoverflow.com/questions/71363579/performance-issues-tensorflow-m1-apple-silicon-chip)

Mã nguồn ví dụ được tải lên tại [Gist Tensorflow Mac M1 Demo](https://gist.github.com/chuongmep/83cdf198ee226ec23288ce6b22b2615c)

## Tổng kết 

Vậy là qua bài viết này, rõ ràng không hề có bất cứ một lý do nào để bạn không thể sử dụng tensorflow trên máy tính Mac M1 của mình. Nếu bạn có bất cứ thắc mắc gì, hãy để lại bình luận bên dưới, mình sẽ cố gắng trả lời bạn. Hi vọng bài viết này sẽ giúp ích cho bạn dễ dàng cài đặt và sử dụng tensorflow trên máy tính Mac M1 của mình mà không phải đau đầu vì những hướng dẫn bị thiếu cách làm và đôi khi khó hiểu ở một trang khác.


