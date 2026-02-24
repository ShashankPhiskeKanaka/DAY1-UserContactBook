import { userServicesClass } from "../services/contact.services"; 
import { serverError } from "../utils/error.utils";

describe("User Service", () => {
  let mockRepository: any;
  let service: userServicesClass;

  beforeEach(() => {
    mockRepository = {
      get: jest.fn(),
      create: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    service = new userServicesClass(mockRepository);
  });


  describe("createUser", () => {
    it("should create user if not exists", async () => {
      const input = { email: "test@test.com" };

      mockRepository.get.mockResolvedValue({});
      mockRepository.create.mockResolvedValue(input);

      const result = await service.createUser(input as any);

      expect(mockRepository.get).toHaveBeenCalledWith(input.email);
      expect(mockRepository.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(input);
    });

    it("should throw error if user exists", async () => {
      const input = { email: "test@test.com" };

      mockRepository.get.mockResolvedValue({ email: input.email });

      await expect(service.createUser(input as any))
        .rejects
        .toThrow(serverError);

      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });


  describe("getAll", () => {
    it("should return all users", async () => {
      const users = [{ email: "a@test.com" }];

      mockRepository.getAll.mockResolvedValue(users);

      const result = await service.getAll();

      expect(result).toEqual(users);
      expect(mockRepository.getAll).toHaveBeenCalled();
    });
  });

  describe("get", () => {
    it("should return user if exists", async () => {
      const user = { email: "a@test.com" };

      mockRepository.get.mockResolvedValue(user);

      const result = await service.get(user.email);

      expect(result).toEqual(user);
    });

    it("should throw error if user does not exist", async () => {
      mockRepository.get.mockResolvedValue({});

      await expect(service.get("a@test.com"))
        .rejects
        .toThrow(serverError);
    });
  });

  describe("update", () => {
    it("should update user if exists", async () => {
      const user = { email: "a@test.com" };

      mockRepository.get.mockResolvedValue(user);
      mockRepository.update.mockResolvedValue(user);

      const result = await service.update(user as any);

      expect(mockRepository.update).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it("should throw error if user does not exist", async () => {
      mockRepository.get.mockResolvedValue({});

      await expect(service.update({ email: "a@test.com" } as any))
        .rejects
        .toThrow(serverError);
    });
  });

  describe("delete", () => {
    it("should delete user if exists", async () => {
      const user = { email: "a@test.com" };

      mockRepository.delete.mockResolvedValue(user);

      const result = await service.delete(user.email);

      expect(result).toEqual(user);
    });

    it("should throw error if user does not exist", async () => {
      mockRepository.delete.mockResolvedValue({});

      await expect(service.delete("a@test.com"))
        .rejects
        .toThrow(serverError);
    });
  });
});