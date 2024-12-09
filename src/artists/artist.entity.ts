import { SongEntity } from 'src/songs/song.entity';
import { UserEntity } from 'src/users/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  // JoinColumn in one-to-one relationship in this case userId is the foreign key of the `user` column
  @JoinColumn()
  user: UserEntity;

  @ManyToMany(() => SongEntity, (song) => song.artists)
  songs: SongEntity[];
}
