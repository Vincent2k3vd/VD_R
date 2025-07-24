import { useGuetCount } from "../hooks/useTable";

const MenuSearch = () => {
  const { data, loading, error } = useGuetCount(5);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  return (
    <ul>
      {data?.data?.map((item) => (
        <li key={item.reservation_id}>
          Bàn {item.table_id} lúc {item.reservation_time} ngày{" "}
          {item.reservation_date}
        </li>
      ))}
    </ul>
  );
};

export default MenuSearch;
