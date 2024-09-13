import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// Danh sách mã giảm giá hợp lệ
const validDiscountCodes = ['30%'];

function TikiShop() {
  // Khởi tạo giá sản phẩm và các trạng thái
  const basePrice = 141800;
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(basePrice);
  const [codeInput, setCodeInput] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [finalPrice, setFinalPrice] = useState(price);
  const [originalPrice, setOriginalPrice] = useState(200000);

  // Tăng số lượng sản phẩm
  const handleIncrease = () => {
    setPrice(basePrice * (quantity + 1));
    setOriginalPrice(200000 * (quantity + 1));
    setQuantity(quantity + 1);

    if (discountApplied) {
      setFinalPrice(basePrice * (quantity + 1) - basePrice * (quantity + 1) * 0.3);
    }
  };

  // Giảm số lượng sản phẩm
  const handleDecrease = () => {
    if (quantity > 1) {
      setPrice(basePrice * (quantity - 1));
      setOriginalPrice(200000 * (quantity - 1));
      setQuantity(quantity - 1);

      if (discountApplied) {
        setFinalPrice(basePrice * (quantity - 1) - basePrice * (quantity - 1) * 0.3);
      }
    } else {
      alert('Số lượng không hợp lệ');
    }
  };

  // Áp dụng mã giảm giá
  const applyDiscount = () => {
    let isValidDiscount = false;

    // Kiểm tra mã giảm giá có hợp lệ không
    if (validDiscountCodes.includes(codeInput)) {
      isValidDiscount = true;
      setDiscountApplied(true);
      setFinalPrice(price - price * 0.3);
      setCodeInput('');
      alert('Áp dụng mã giảm giá thành công');
    }

    if (!isValidDiscount) {
      setCodeInput('');
      alert('Mã giảm giá không hợp lệ');
    }
  };

  // Đặt hàng và thiết lập lại giá
  const placeOrder = () => {
    alert('Đặt hàng thành công');
    setPrice(basePrice);
    setQuantity(1);
    setOriginalPrice(200000);
    setDiscountApplied(false);
  };

  // Định dạng giá tiền
  const formatPrice = (price) => {
    return price.toLocaleString('vi', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 2,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.productDetail}>
        <View style={styles.itemWrapper}>
          <Image style={styles.itemImg} source={require('../assets/book.png')} />
          <View style={styles.itemDetail}>
            <Text style={styles.itemTxt}>Nguyên hàm tích phân và ứng dụng</Text>
            <Text style={styles.itemTxt}>Cung cấp bởi Tiki Trading</Text>
            <Text style={styles.price}>{formatPrice(price)}</Text>
            <Text style={styles.priceBefore}>{formatPrice(originalPrice)}</Text>
            <View style={styles.number}>
              <View style={styles.numberWrapper}>
                <TouchableOpacity style={styles.btn} onPress={handleDecrease}>
                  <Text style={styles.btnDescTxt}>-</Text>
                </TouchableOpacity>
                <Text style={styles.numberTxt}>{quantity}</Text>
                <TouchableOpacity style={styles.btn} onPress={handleIncrease}>
                  <Text style={styles.btnIncTxt}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.buyAfter}>Mua sau</Text>
            </View>
          </View>
        </View>
        <View style={styles.saveDiscount}>
          <Text style={styles.saveDiscountTxt}>Mã giảm giá đã lưu</Text>
          <Text style={styles.seeSaveDiscount}>Xem tại đây</Text>
        </View>
        <View style={styles.discountWrapper}>
          <TextInput
            style={styles.discountInput}
            placeholder="Mã giảm giá"
            onChangeText={setCodeInput}
            value={codeInput}
          />
          <View style={styles.discountBlock}></View>
          <TouchableOpacity style={styles.applyBtn} onPress={applyDiscount}>
            <Text style={styles.applyTxt}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.presentWrapper}>
        <Text style={styles.presentTxt}>Bạn có phiếu quà tặng Tiki/Got it/ Urbox?</Text>
        <Text style={styles.type}>Nhập tại đây?</Text>
      </View>
      <View style={styles.moneyWrapper}>
        <Text style={styles.calcTxt}>Tạm tính</Text>
        <Text style={styles.money}>{formatPrice(price)}</Text>
      </View>
      <View style={styles.lastMoneyWrapper}>
        <View style={styles.lastMoneyTxtWrapper}>
          <Text style={styles.lastMoneyTxt}>Thành tiền</Text>
          <Text style={styles.lastMoney}>
            {discountApplied ? formatPrice(finalPrice) : formatPrice(price)}
          </Text>
        </View>
        <TouchableOpacity style={styles.btnOrder} onPress={placeOrder}>
          <Text style={styles.orderTxt}>TIẾN HÀNH ĐẶT HÀNG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ccc',
        position: 'relative',
    },
    productDetail: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff'
    },
    itemWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    itemImg: {
        width: 110,
        height: 150,
    },
    itemDetail: {
        width: '65%',
    },
    itemTxt: {
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 700,
        marginBottom: 10,
    },
    price: {
        color: '#EE0D0D',
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 10,
    },
    priceBefore: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 700,
        position: 'relative',
        color: '#808080',
        marginBottom: 10,
        textDecorationLine: 'line-through',
    },
    line: {
        width: 50,
        height: 2,
        position: 'absolute',
        bottom: 59,
    },
    number: {
       display: 'flex',
       flexDirection: 'row',
       justifyContent: 'space-between',
    },
    numberWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },  
    btn: {
        width: 15, 
        height: 15,
        backgroundColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnIncTxt: {
        width: 10,
        paddingBottom: 3,
    },
    btnDescTxt: {
        width: 10,
        paddingBottom: 3,
        paddingLeft: 2,
    },
    numberTxt: {
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: -1,
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: 700,
    },
    buyAfter: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 700,
        color: '#134fec',
    },
    saveDiscount: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    },
    saveDiscountTxt: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 700,
    },
    seeSaveDiscount: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 700,
        color: '#134FEC',
        marginLeft: 20,
    },
    discountWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '100%',
        position: 'relative',
    },
    discountInput: {
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#ccc',
        width: 208,
        paddingLeft: 50,
    },
    discountBlock: {
        width: 32,
        height: 16,
        backgroundColor: '#F2DD1B',
        marginLeft: 10,
        marginRight: 10,
        position: 'absolute',
        top: 15,
    },
    discountTxt: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 700,
        marginTop: -2,
    },
    applyBtn: {
        width: 100,
        height: 45,
        backgroundColor: '#134FEC',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyTxt: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 700,
        color: '#fff',
    },
    presentWrapper: {
        padding: 20,
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        marginTop: 30,
    },
    presentTxt: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 700,
    },
    type: {
        fontFamily: 'Roboto',
        fontSize: 12,
        fontWeight: 700,
        color: '#134FEC',
        marginLeft: 20,
    },
    moneyWrapper: {
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    calcTxt: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 700,
    },
    money: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 700,
        color: '#EE0D0D',
    },
    lastMoneyWrapper: {
        width: '100%', 
        backgroundColor: '#fff',
        padding: 20,
        float: 'bottom',
        position: 'absolute',
        bottom: 0,
    },
    lastMoneyTxtWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lastMoneyTxt: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 700,
        color: '#808080'
    },
    lastMoney: {
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 700,
        color: '#EE0D0D',
    },
    btnOrder: {
        width: '100%',
        height: 45,
        marginTop: 20,
        backgroundColor: '#E53935',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    orderTxt: {
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 700,
        color: '#fff',
    },
});

export default TikiShop;