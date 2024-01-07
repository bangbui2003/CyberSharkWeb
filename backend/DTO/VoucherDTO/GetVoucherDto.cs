﻿namespace TEST_CRUD.DTO.VoucherDTO
{
    public class GetVoucherDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Percent { get; set; }
        public DateTime? Date_Start { get; set; }

        public DateTime? Date_Expired { get; set; }

        public int Used_Number { get; set; }
        public int Max_Used_Number { get; set; }
    }
}
