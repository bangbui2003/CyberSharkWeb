using TEST_CRUD.DTO;
using TEST_CRUD.DTO.OrderDTO;

namespace TEST_CRUD.Services.Orders
{
    public interface IOrderService
    {
        Task<ServiceResponse<IEnumerable<GetOrderDto?>>> GetList(string search);
        Task<ServiceResponse<GetOrderDto?>> GetById(string orderid);
        Task<ServiceResponse<IEnumerable<GetOrderDto?>>> GetByCustomerId(int customerId);
        Task<ServiceResponse<GetOrderDto?>> Add(AddOrderDto order);
        Task<ServiceResponse<GetOrderDto?>> UpdateOrderStatus(string id, string status);
        
    }
}
