﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TEST_CRUD.DTO.ProductDTO;
using TEST_CRUD.Services;
using TEST_CRUD.Services.Categories;

namespace TEST_CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;
        public ProductController(IProductService ProductService)
        {
            productService = ProductService;
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> GetProductList(string search = "")
        {
            try
            {
                var result = await productService.GetList(search);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet]
        [Route("sorthigh")]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> SortFromHighToLow(string direction)
        {
            try
            {
                var result = await productService.SortFromHighToLow(direction);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet]
        [Route("sortinrange")]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> GetInRange(double top, double down)
        {
            try
            {
                var result = await productService.GetInRange(top,down);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet]
        [Route("getcategory")]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> GetByCategory(int categoryId)
        {
            try
            {
                var result = await productService.GetByCategory(categoryId);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> GetSingle(int id)
        {
            try
            {
                var result = await productService.GetById(id);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result.Message);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> AddProduct(AddProductDto category)
        {
            try
            {
                var result = await productService.Add(category);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result.Message);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpPut]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> UpdateCharacter(AddProductDto updatedCharacter, int id)
        {
            try
            {
                var result = await productService.Update(updatedCharacter, id);
                if (result.Success)
                {
                    return Ok(result);
                }

                return BadRequest(result.Message);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }

        }
        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<GetProductDto>>> DeleteProduct(int productId)
        {
            var result = await productService.Delete(productId);
            if (result.Success)
            {
                return Ok(result);
            }

            return BadRequest(result.Message);

        }
    }
}
