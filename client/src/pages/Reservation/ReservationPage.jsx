import { useState, useEffect, useMemo } from "react";
import StepHeader from "../../components/Reservation/StepHeader";
import Step1TableSelection from "../../components/Reservation/Step1TableSelection";
import Step2MenuSelection from "../../components/Reservation/Step2MenuSelection";
import Step3CustomerInfo from "../../components/Reservation/Step3CustomerInfo";
import Step4Success from "../../components/Reservation/Step4Success";
import { useGetTable } from "../../hooks/useTable";
import { useMenuList } from "../../hooks/useMenuItem";
import { useCreateReservation } from "../../hooks/useReservation";
import { useSelector } from "react-redux";

const ReservationPage = () => {
  const [step, setStep] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const [reservationData, setReservationData] = useState({
    reservation_date: "",
    reservation_time: "",
    guest_count: 1,
    table_id: [],
    user_id: user?.user_id,
    type: "standard",
    status: "available",
    location: "",
    items: [],
    customerInfo: {
      name: user?.username || "",
      phone: "",
      email: user?.email || "",
      special_requests: "",
    },
  });

  const tableParams = useMemo(
    () => ({
      status: reservationData.status,
      capacity: reservationData.guest_count,
    }),
    [reservationData.status, reservationData.guest_count]
  );

  const { data: tablesData, loading: tablesLoading } = useGetTable(tableParams);

  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);

  const { data: menuData, loading: menuLoading } = useMenuList({}, true);
  const { mutate: createReservation, isLoading: isCreating } =
    useCreateReservation();
  const [reservationSuccess, setReservationSuccess] = useState(null);

  useEffect(() => {
    const newTotal = selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [selectedItems]);

  const handleSubmit = () => {
    const finalData = {
      ...reservationData,
      menuItems: selectedItems,
      totalAmount: total,
    };
    createReservation(finalData, {
      onSuccess: (response) => {
        setReservationSuccess(response.data);
        setStep(4);
      },
      onError: (error) => {
        console.error("Đặt bàn thất bại", error);
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <StepHeader step={step} />
      {step === 1 && (
        <Step1TableSelection
          reservationData={reservationData}
          setReservationData={setReservationData}
          setStep={setStep}
          tablesData={tablesData?.data}
          tablesLoading={tablesLoading}
        />
      )}
      {step === 2 && (
        <Step2MenuSelection
          menuData={menuData.data}
          menuLoading={menuLoading}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          setReservationData={setReservationData}
          setStep={setStep}
          total={total}
        />
      )}
      {step === 3 && (
        <Step3CustomerInfo
          reservationData={reservationData}
          setReservationData={setReservationData}
          setStep={setStep}
          tablesData={tablesData?.data}
          selectedItems={selectedItems}
          total={total}
          handleSubmit={handleSubmit}
          isCreating={isCreating}
        />
      )}
      {step === 4 && reservationSuccess && (
        <Step4Success data={reservationSuccess} />
      )}
    </div>
  );
};

export default ReservationPage;
