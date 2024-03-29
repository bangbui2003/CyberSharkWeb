﻿using Microsoft.EntityFrameworkCore;
using TEST_CRUD.Data;
using TEST_CRUD.DTO.AddressDTO;

namespace TEST_CRUD.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly CyberSharkContext appDbContext;
        public AddressRepository(CyberSharkContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }
        public async Task<IEnumerable<Address?>> GetList()
        {
            var addressList = appDbContext.Address.AsQueryable();
            //// Filter Items has been Deleted /////////////////////
            addressList = addressList.Where(b => b.IsDeleted != true);


            return await addressList.ToListAsync();
        }
        public async Task<IEnumerable<Address?>> GetById(int id)
        {

            return await appDbContext.Address.AsQueryable().Where(b => b.IsDeleted == false && b.Customer_Id == id).ToListAsync();
        }
        public async Task<Address> Add(Address address)
        {
            var addAddress = await appDbContext.Address.AddAsync(address);
            await appDbContext.SaveChangesAsync();
            return addAddress.Entity;
        }
        public async Task<Address> Update(AddAddressDto address, int Id)
        {
            var result = await appDbContext.Address.FirstOrDefaultAsync(br => br.Id == Id);

            if (result != null)
            {
                result.Address_Street = address.Address_Street;
                result.Address_District = address.Address_District;
                result.Address_City = address.Address_City;
                result.Address_Country = address.Address_Country;
                result.Receiver_Name = address.Receiver_Name;
                result.Receiver_Telephone = address.Receiver_Telephone;
                result.Is_Default = address.Is_Default;
                result.Date_Modified = DateTime.Now;
                await appDbContext.SaveChangesAsync();
                return result;
            }

            return null;
        }
        public async Task<Address> Delete(int id)
        {
            var result = await appDbContext.Address.FirstOrDefaultAsync(br => br.Id == id);
            if (result != null)
            {
                result.IsDeleted = true;
                result.Date_Deleted = DateTime.Now;
                await appDbContext.SaveChangesAsync();
                return result;
            }
            return null;
        }
    }
}
