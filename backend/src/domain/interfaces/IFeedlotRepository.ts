import { Feedlot } from "../entities/Feedlot.js";

export interface IFeedlotRepository {
  findById(id: number): Promise<Feedlot | null>;
  findAll(): Promise<Feedlot[]>;
  create(feedlot: Feedlot): Promise<Feedlot>;
  update(feedlot: Feedlot): Promise<void>;
  delete(id: number): Promise<void>;
  exists(id: number): Promise<boolean>;
}

