import { SongEntity } from 'src/songs/song.entity';
import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SongEntity, (song) => song.playlist)
  songs: SongEntity[];

  @ManyToOne(() => UserEntity, (user) => user.playlists)
  user: UserEntity;
}
