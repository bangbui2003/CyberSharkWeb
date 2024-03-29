﻿global using TEST_CRUD.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using TEST_CRUD;
using TEST_CRUD.Data;
using TEST_CRUD.Repositories;
using TEST_CRUD.Repositories.Carts;
using TEST_CRUD.Repositories.Customers;
using TEST_CRUD.Repositories.Payments;
using TEST_CRUD.Services;
using TEST_CRUD.Services.Addresses;
using TEST_CRUD.Services.Carts;
using TEST_CRUD.Services.Categories;
using TEST_CRUD.Services.Users;
using TEST_CRUD.Services.Customers;
using TEST_CRUD.Services.Orders;
using TEST_CRUD.Services.Payments;
using TEST_CRUD.Services.Blogs;
using TEST_CRUD.Services.Reviews;
using TEST_CRUD.Services.Vouchers;
using TEST_CRUD.Repositories.Vouchers;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<CyberSharkContext>(options =>
options.UseMySQL(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAutoMapper(typeof(Program).Assembly);


//////////////////////////// Brand //////////////////////////
builder.Services.AddTransient<IBrandService, BrandService>();
builder.Services.AddTransient<IBrandRepository, BrandRepository>();
//////////////////////////// Product //////////////////////////
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IProductRepository, ProductRepository>();
//////////////////////////// Category //////////////////////////
builder.Services.AddTransient<ICategoryService, CategoryService>();
builder.Services.AddTransient<ICategoryRepository, CategoryRepository>();
//////////////////////////// Customer //////////////////////////
builder.Services.AddTransient<ICustomerService, CustomerService>();
builder.Services.AddTransient<ICustomerRepository, CustomerRepository>();
//////////////////////////// Cart //////////////////////////
builder.Services.AddTransient<ICartService, CartService>();
builder.Services.AddTransient<ICartRepository, CartRepository>();
//////////////////////////// Address //////////////////////////
builder.Services.AddTransient<IAddressService, AddressService>();
builder.Services.AddTransient<IAddressRepository, AddressRepository>();
//////////////////////////// Order //////////////////////////
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddTransient<IOrderRepository, OrderRepository>();
//////////////////////////// Payment //////////////////////////
builder.Services.AddTransient<IPaymentService, PaymentService>();
builder.Services.AddTransient<IPaymentRepository, PaymentRepository>();
//////////////////////////// User //////////////////////////
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IEmailService, EmailService>();

/////////////////////////// SignalR ////////////////////////
builder.Services.AddSignalR();
/*builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("https://localhost:7226")
                .AllowAnyHeader()
                .WithMethods("GET", "POST")
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials();
        });
});*/

builder.Services.AddCors(options =>
{
    options.AddPolicy("_myAllowSpecificOrigins", builder =>
    {
        builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

/////////////////////////// SignalR ////////////////////////

//////////////////////////// Blog //////////////////////////
builder.Services.AddTransient<IBlogService, BlogService>();
builder.Services.AddTransient<IBlogRepository, BlogRepository>();
//////////////////////////// Review //////////////////////////
builder.Services.AddTransient<IReviewService, ReviewService>();
builder.Services.AddTransient<IReviewRepository, ReviewRepository>();
//////////////////////////// Voucher //////////////////////////
builder.Services.AddTransient<IVoucherService, VoucherService>();
builder.Services.AddTransient<IVoucherRepository, VoucherRepository>();


// Đăng ký dịch vụ phân quyền
builder.Services.AddAuthorization();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.UseAuthentication();
app.MapControllers();

app.Run();
