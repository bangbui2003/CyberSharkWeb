using TEST_CRUD.DTO;
using TEST_CRUD.DTO.OrderDTO;

namespace TEST_CRUD.Repositories
{
    public interface IOrderRepository
    {
        public Task<IEnumerable<GetOrderDto>> GetList(string search);
        public Task<GetOrderDto?> GetById(string id);
        public Task<GetOrderDto?> Add(AddOrderDto order);
        public Task<GetOrderDto?> UpdateOrderStatus(string orderid, string status);
        public Task<IEnumerable<GetOrderDto?>> GetByCustomerId(int id);
    }
}
