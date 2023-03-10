import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addPost } from '../api/postApi';
import Header from '../components/common/Header';
import HeaderButton from '../components/common/HeaderButton';
import HeaderCloseButton from '../components/common/HeaderCloseButton';
import ImageCropper from '../components/common/ImageCropper';
import Modal from '../components/common/Modal/Modal';
import ModalCategory from '../components/common/Modal/ModalCategory';
import ModalDate from '../components/common/Modal/ModalDate';
import ModalPayment from '../components/common/Modal/ModalPayment';
import Popup from '../components/common/Popup/Popup';
import PhotoContents from '../components/write/PhotoContents';
import WriteFormNumber from '../components/write/WriteFormNumber';
import WriteFormSelect from '../components/write/WriteFormSelect';
import WriteFormText from '../components/write/WriteFormText';
import WriteFormTextArea from '../components/write/WriteFormTextArea';
import WriteFormTitle from '../components/write/WriteFormTitle';
import useImageCropper from '../hooks/useImageCropper';
import useModal from '../hooks/useModal';
import usePopup from '../hooks/usePopup';
import Container from '../styles/Container';
import fonts from '../styles/FontStyle';
import Page from '../styles/Page';
import colors from '../styles/Theme';

const Write = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState(false);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const [imgFile, setImgFile] = useState();
  const [cropImg, setCropImg] = useState();
  const placeRef = useRef(null);
  const timeRef = useRef(moment().format('YYYY-MM-DDTHH:mm:ss'));
  const categoryRef = useRef(null);
  const contentRef = useRef(null);
  const paymentRef = useRef(null);
  const payPlaceRef = useRef(null);
  const [payPrice, setPayPrice] = useState('');
  const { isOpenPopup, popupMessage, openPopup, closePopup } = usePopup();
  const { openedModal, openModal, closeModal } = useModal();
  const { isOpenCropper, openImageCropper, closeImageCropper } =
    useImageCropper();
  const handleDateSelect = () => {
    openModal(<ModalDate closeModal={closeModal} timeRef={timeRef} />);
  };
  const handleCategorySelect = () => {
    openModal(
      <ModalCategory closeModal={closeModal} categoryRef={categoryRef} />
    );
  };
  const handlePaymentSelect = () => {
    openModal(<ModalPayment closeModal={closeModal} paymentRef={paymentRef} />);
  };
  const postSubmitHandler = async () => {
    setIsLoding(true);
    if (checkValidation()) {
      setIsLoding(false);
      return;
    }

    const bstr = atob(cropImg.split(',')[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const imageFile = new File([u8arr], `${titleRef.current.value}.jpeg`, {
      type: 'image/jpeg',
    });

    const formData = new FormData();
    formData.append('ehTitle', titleRef.current.value);
    formData.append('ehDate', timeRef.current);
    formData.append('ehMiSeq', 1);
    formData.append('ehPiSeq', paymentRef.current.paymentSeq);
    formData.append('ehPrice', Number(payPrice.replace(/,/g, '')));
    formData.append('ehStoreName', payPlaceRef.current.value);
    formData.append('ehLocation', placeRef.current.value);
    formData.append('ehBalance', 10000);
    formData.append('ehCcSeq', categoryRef.current.categorySeq);
    formData.append('ehCdcSeq', categoryRef.current.detailCategorySeq);
    formData.append('ehContent', contentRef.current.value);
    formData.append('ehImgFile', imageFile);

    try {
      const res = await addPost(formData);
      console.log(res);
      setIsLoding(false);
      navigate('/');
    } catch (err) {
      console.log(err);
      setIsLoding(false);
    }
  };

  const checkValidation = () => {
    if (!titleRef.current.value.trim()) {
      openPopup('????????? ????????? ?????????.');
      return true;
    }
    if (!cropImg) {
      openPopup('????????? ????????? ?????????.');
      return true;
    }
    if (!placeRef.current.value) {
      openPopup('????????? ????????? ?????????.');
      return true;
    }
    if (!timeRef.current) {
      openPopup('????????? ????????? ?????????.');
      return true;
    }
    if (!categoryRef.current) {
      openPopup('??????????????? ????????? ?????????.');
      return true;
    }
    if (!paymentRef.current) {
      openPopup('?????? ????????? ????????? ?????????.');
      return true;
    }
    if (!payPlaceRef.current.value) {
      openPopup('???????????? ????????? ?????????.');
      return true;
    }
    if (!payPlaceRef.current.value) {
      openPopup('????????? ????????? ?????????.');
      return true;
    }
    return false;
  };

  const clickImageEvent = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    openImageCropper();
  };

  return (
    <Page>
      <Header
        title={'????????????'}
        HeaderLeft={<HeaderCloseButton />}
        HeaderRight={
          <HeaderButton
            onClick={postSubmitHandler}
            disabled={isLoading && true}
          >
            <ButtonText>??????</ButtonText>
          </HeaderButton>
        }
      />
      <Container>
        <WriteForm>
          <WriteInfo>
            <WriteFormTitle textRef={titleRef} />
            <PhotoContents
              imgRef={imgRef}
              cropImg={cropImg}
              clickImageEvent={clickImageEvent}
            />
          </WriteInfo>
          <WriteFormText title={'??????'} textRef={placeRef} />
          <WriteFormSelect
            title={'??????'}
            value={moment(timeRef.current).format('YYYY/MM/DD a hh : mm')}
            selectEvent={handleDateSelect}
          />
          <WriteFormSelect
            title={'????????????'}
            value={
              !categoryRef.current
                ? ''
                : `${categoryRef.current.categoryName} ${
                    !categoryRef.current.detailCategoryName
                      ? ''
                      : ' > ' + categoryRef.current.detailCategoryName
                  }`
            }
            selectEvent={handleCategorySelect}
          />
          <WriteFormTextArea title={'??????'} textRef={contentRef} />
          <WriteFormSelect
            title={'?????? ??????'}
            value={
              !paymentRef.current ? '' : `${paymentRef.current.paymentName}`
            }
            selectEvent={handlePaymentSelect}
          />
          <WriteFormText title={'?????????'} textRef={payPlaceRef} />
          <WriteFormNumber
            title={'??????'}
            value={payPrice}
            setValue={setPayPrice}
          />
        </WriteForm>
      </Container>
      <Modal openedModal={openedModal} closeModal={closeModal} />
      <Popup
        isOpenPopup={isOpenPopup}
        closePopup={closePopup}
        message={popupMessage.current}
        buttonText={'??????'}
      />
      <ImageCropper
        isOpenCropper={isOpenCropper}
        closeImageCropper={closeImageCropper}
        imgRef={imgRef}
        setImgFile={setImgFile}
        imgFile={imgFile}
        setCropImg={setCropImg}
      />
    </Page>
  );
};


const ButtonText = styled.span`
  color: ${colors.primary};
  font: ${fonts.score15Regular};
  line-height: 15px;
`;

const WriteForm = styled.div`
  width: 100%;
  padding: 32px 16px;
`;

const WriteInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export default Write;
