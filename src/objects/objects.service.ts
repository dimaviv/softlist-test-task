import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { BookingObject } from './objects.model';
import { CreateObjectDto,  } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { PaginationParamsDto } from "./dto/pagination-params.dto";


@Injectable()
export class ObjectsService {
  constructor(
    @InjectModel(BookingObject)
    private objectRepository: typeof BookingObject,
  ) {}


  async create(createObjectDto: CreateObjectDto): Promise<BookingObject> {
    const newObject = new this.objectRepository(createObjectDto);
    return newObject.save();
  }

  async findAll(paginationParams: PaginationParamsDto): Promise<{ data: BookingObject[]; total: number }> {
    const { page, limit } = paginationParams;

    const offset = (page - 1) * limit;
    const [results, total] = await Promise.all([
      this.objectRepository.findAll({
        limit,
        offset
      }),
      this.objectRepository.count()
    ]);

    return {
      data: results,
      total
    };
  }

  async findOne(id: number): Promise<BookingObject> {
    return this.objectRepository.findByPk(id);
  }

  async findOneWithOrders(id: number): Promise<BookingObject> {
    return this.objectRepository.findByPk(id, { include: [{ all: true }] });
  }

  async update(id: number, updateObjectDto: UpdateObjectDto): Promise<BookingObject> {
    const [numberOfAffectedRows, [updatedObject]] = await this.objectRepository.update(updateObjectDto, {
      where: { id },
      returning: true,
    });

    if (!updatedObject) throw new Error("The object wasn't found")

    return updatedObject;
  }

  async remove(id: number): Promise<void> {
    const object = await this.objectRepository.findByPk(id);

    if (!object) throw new Error("Booking object doesn't exist")

    await object.destroy();
  }

  async incrementAvailableUnits(bookingObjectId: number, incrementBy: number, transaction?: any): Promise<void> {
    const bookingObject = await this.objectRepository.findByPk(bookingObjectId, { transaction });

    if (!bookingObject) {
      throw new NotFoundException('Booking object not found');
    }

    bookingObject.availableUnits += incrementBy;
    await bookingObject.save({ transaction });
  }

  async decrementAvailableUnits(bookingObjectId: number, decrementBy: number, transaction?: any): Promise<void> {
    const bookingObject = await this.objectRepository.findByPk(bookingObjectId, { transaction });

    if (!bookingObject || bookingObject.availableUnits < decrementBy) {
      throw new BadRequestException('Not enough available units or booking object not found');
    }

    bookingObject.availableUnits -= decrementBy;
    await bookingObject.save({ transaction });
  }
}
